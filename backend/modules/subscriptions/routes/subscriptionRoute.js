const express = require("express");
const authMiddleware = require("../../../middleware/authMiddleware/authMiddleware.js");
const roleMiddleware = require("../../../middleware/roleMiddleware/roleMiddleware.js");
const {
  createSubscription,
  getSubscriptions,
  getSingleSubscription,
  updateSubscription,
  deleteSubscription,
} = require("../controller/subscriptionController.js");

const router = express.Router();

router.use(authMiddleware, roleMiddleware("admin"));

router.post("/", createSubscription);
router.get("/", getSubscriptions);
router.get("/:id", getSingleSubscription);
router.put("/:id", updateSubscription);
router.delete("/:id", deleteSubscription);

module.exports = router;
