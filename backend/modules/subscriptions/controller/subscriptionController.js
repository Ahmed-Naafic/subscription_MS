const mongoose = require("mongoose");
const Customer = require("../../customers/models/customer.js");
const Plan = require("../../plans/models/plans.js");
const Subscription = require("../models/subscription.js");

const createSubscription = async (req, res) => {
  try {
    const { customer, plan, startDate, endDate, status } = req.body;

    if (!customer || !plan) {
      return res.status(400).json({
        message: "customer and plan are required",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(customer) ||
      !mongoose.Types.ObjectId.isValid(plan)
    ) {
      return res.status(400).json({
        message: "Invalid customer or plan",
      });
    }

    const existingCustomer = await Customer.findById(customer);
    if (!existingCustomer) {
      return res.status(400).json({
        message: "Invalid customer",
      });
    }

    const existingPlan = await Plan.findOne({ _id: plan, isDeleted: false });
    if (!existingPlan) {
      return res.status(400).json({
        message: "Invalid plan",
      });
    }

    const subscription = await Subscription.create({
      customer: existingCustomer._id,
      plan: existingPlan._id,
      startDate,
      endDate,
      status,
    });

    const populatedSubscription = await subscription.populate([
      { path: "customer", select: "name email" },
      { path: "plan", select: "name price service", populate: { path: "service", select: "name" } },
    ]);

    res.status(201).json({
      message: "subscription created successfully",
      subscription: populatedSubscription,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSubscriptions = async (req, res) => {
  try {
    const { customer, plan, status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (customer) {
      if (!mongoose.Types.ObjectId.isValid(customer)) {
        return res.status(400).json({ message: "Invalid customer" });
      }
      query.customer = customer;
    }

    if (plan) {
      if (!mongoose.Types.ObjectId.isValid(plan)) {
        return res.status(400).json({ message: "Invalid plan" });
      }
      query.plan = plan;
    }

    if (status) {
      query.status = status;
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const subscriptions = await Subscription.find(query)
      .populate("customer", "name email")
      .populate({
        path: "plan",
        select: "name price service",
        populate: { path: "service", select: "name" },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    const total = await Subscription.countDocuments(query);

    res.status(200).json({
      subscriptions,
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

const getSingleSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id)
      .populate("customer", "name email")
      .populate({
        path: "plan",
        select: "name price service",
        populate: { path: "service", select: "name" },
      });

    if (!subscription) {
      return res.status(404).json({
        message: "subscription not found",
      });
    }

    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        message: "subscription not found",
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

    if (updateData.plan) {
      if (!mongoose.Types.ObjectId.isValid(updateData.plan)) {
        return res.status(400).json({ message: "Invalid plan" });
      }

      const plan = await Plan.findOne({
        _id: updateData.plan,
        isDeleted: false,
      });
      if (!plan) {
        return res.status(400).json({ message: "Invalid plan" });
      }
    }

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate("customer", "name email")
      .populate({
        path: "plan",
        select: "name price service",
        populate: { path: "service", select: "name" },
      });

    res.status(200).json({
      message: "subscription updated successfully",
      subscription: updatedSubscription,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        message: "subscription not found",
      });
    }

    await subscription.deleteOne();

    res.status(200).json({
      message: "subscription deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSubscription,
  getSubscriptions,
  getSingleSubscription,
  updateSubscription,
  deleteSubscription,
};
