const User = require("../../../modules/auth/models/user");


const getCustomers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .select({role: "customer"})
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { role, unlockAccount } = req.body;

    const user = await User.findOne({_id :req.params.id, role:"customer"});

    if (!user) {
      return res.status(404).json({
        message: "customer not found",
      });
    }

    if (role) {
      if (![ "customer"].includes(role)) {
        return res.status(400).json({
          message: "Invalid role",
        });
      }

      user.role = role;
    }

    if (unlockAccount) {
      user.loginAttempts = 0;
      user.lockUntil = null;
    }

    await user.save();

    res.status(200).json({
      message: "customer updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        loginAttempts: user.loginAttempts,
        lockUntil: user.lockUntil,
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
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        message: "You cannot delete your own account",
      });
    }

  const user = await User.findOne({_id :req.params.id, role:"customer"});

    if (!user) {
      return res.status(404).json({
        message: "customer not found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      message: "customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {getCustomers, updateCustomer, deleteCustomer}