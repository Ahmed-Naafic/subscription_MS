const mongoose = require("mongoose");
const Customer = require("../../customers/models/customer.js");
const Subscription = require("../../subscriptions/models/subscription.js");
const Payment = require("../models/payment.js");

const createPayment = async (req, res) => {
  try {
    const { customer, subscription, amount, paymentMethod, status } = req.body;

    if (!customer || !subscription || amount === undefined || !paymentMethod) {
      return res.status(400).json({
        message: "customer, subscription, amount and paymentMethod are required",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(customer) ||
      !mongoose.Types.ObjectId.isValid(subscription)
    ) {
      return res.status(400).json({
        message: "Invalid customer or subscription",
      });
    }

    const existingCustomer = await Customer.findById(customer);
    if (!existingCustomer) {
      return res.status(400).json({
        message: "Invalid customer",
      });
    }

    const existingSubscription = await Subscription.findById(subscription);
    if (!existingSubscription) {
      return res.status(400).json({
        message: "Invalid subscription",
      });
    }

    if (existingSubscription.customer.toString() !== existingCustomer._id.toString()) {
      return res.status(400).json({
        message: "subscription does not belong to this customer",
      });
    }

    const payment = await Payment.create({
      customer: existingCustomer._id,
      subscription: existingSubscription._id,
      amount,
      paymentMethod,
      status,
    });

    const populatedPayment = await payment.populate([
      { path: "customer", select: "name email" },
      { path: "subscription", populate: { path: "plan", select: "name price" } },
    ]);

    res.status(201).json({
      message: "payment created successfully",
      payment: populatedPayment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPayments = async (req, res) => {
  try {
    const { customer, subscription, status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (customer) {
      if (!mongoose.Types.ObjectId.isValid(customer)) {
        return res.status(400).json({ message: "Invalid customer" });
      }
      query.customer = customer;
    }

    if (subscription) {
      if (!mongoose.Types.ObjectId.isValid(subscription)) {
        return res.status(400).json({ message: "Invalid subscription" });
      }
      query.subscription = subscription;
    }

    if (status) {
      query.status = status;
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const payments = await Payment.find(query)
      .populate("customer", "name email")
      .populate({
        path: "subscription",
        populate: { path: "plan", select: "name price" },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    const total = await Payment.countDocuments(query);

    res.status(200).json({
      payments,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / limitNumber),
        limit: limitNumber,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSinglePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("customer", "name email")
      .populate({
        path: "subscription",
        populate: { path: "plan", select: "name price" },
      });

    if (!payment) {
      return res.status(404).json({
        message: "payment not found",
      });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "payment not found",
      });
    }

    const updateData = { ...req.body };

    if (updateData.customer) {
      if (!mongoose.Types.ObjectId.isValid(updateData.customer)) {
        return res.status(400).json({ message: "Invalid customer" });
      }

      const customer = await Customer.findById(updateData.customer);
      if (!customer) {
        return res.status(400).json({ message: "Invalid customer" });
      }
    }

    if (updateData.subscription) {
      if (!mongoose.Types.ObjectId.isValid(updateData.subscription)) {
        return res.status(400).json({ message: "Invalid subscription" });
      }

      const subscription = await Subscription.findById(updateData.subscription);
      if (!subscription) {
        return res.status(400).json({ message: "Invalid subscription" });
      }
    }

    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate("customer", "name email")
      .populate({
        path: "subscription",
        populate: { path: "plan", select: "name price" },
      });

    res.status(200).json({
      message: "payment updated successfully",
      payment: updatedPayment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "payment not found",
      });
    }

    await payment.deleteOne();

    res.status(200).json({
      message: "payment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPayment,
  getPayments,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
