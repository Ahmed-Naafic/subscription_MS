const Customer = require("../models/customer");


const createCustomer = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    // validation
    if (!name || !email ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // check existing user
    const normalizedEmail = email.trim().toLowerCase();
    const existingCustomer = await Customer.findOne({ email: normalizedEmail });

    if (existingCustomer) {
      return res.status(400).json({
        message: "Customer already exists",
      });
    }

  
    const customer = await Customer.create({
      name,
      email: normalizedEmail,
      address,
    });

    res.status(201).json({
      message: "customer has been created successfully",
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        address: customer.address,
        role: customer.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()
      .sort({ createdAt: -1 });

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "customer not found",
      });
    }

    if (name) {
      customer.name = name;
    }

    if (email) {
      const normalizedEmail = email.trim().toLowerCase();
      const existingCustomer = await Customer.findOne({
        email: normalizedEmail,
        _id: { $ne: customer._id },
      });

      if (existingCustomer) {
        return res.status(400).json({
          message: "Customer email already exists",
        });
      }

      customer.email = normalizedEmail;
    }

    if (address !== undefined) {
      customer.address = address;
    }

    await customer.save();

    res.status(200).json({
      message: "customer updated successfully",
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        address: customer.address,
        role: customer.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "customer not found",
      });
    }

    await customer.deleteOne();

    res.status(200).json({
      message: "customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {getCustomers, updateCustomer, deleteCustomer, createCustomer}
