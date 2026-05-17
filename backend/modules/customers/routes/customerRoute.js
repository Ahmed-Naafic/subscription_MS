const express = require("express");
const authMiddleware = require("../../../middleware/authMiddleware/authMiddleware.js");
const roleMiddleware = require("../../../middleware/roleMiddleware/roleMiddleware.js");
const {getCustomers, updateCustomer,deleteCustomer } = require("../../customers/controller/customerController.js");
const router =express.Router();


router.use(authMiddleware, roleMiddleware("admin"));

router.get("/", getCustomers);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router ; 
   