const express = require("express");
const authMiddleware = require("../../../middleware/authMiddleware/authMiddleware.js");
const roleMiddleware = require("../../../middleware/roleMiddleware/roleMiddleware.js");
const {
  createPayment,
  getPayments,
  getSinglePayment,
  updatePayment,
  deletePayment,
} = require("../controller/paymentController.js");

const router = express.Router();

router.use(authMiddleware, roleMiddleware("admin"));

router.post("/", createPayment);
router.get("/", getPayments);
router.get("/:id", getSinglePayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
