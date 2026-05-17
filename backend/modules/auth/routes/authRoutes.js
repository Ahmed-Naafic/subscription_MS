const express = require("express");
const authMiddleware = require("../../../middleware/authMiddleware/authMiddleware.js");
const {
  registerUser,
  loginUser,
  getMe,
  adminDashboard,
  
} = require ("../controller/authController.js");
const roleMiddleware = require("../../../middleware/roleMiddleware/roleMiddleware.js");
const router =express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/me",authMiddleware,getMe)
router.get( "/admin",authMiddleware,roleMiddleware("admin"),adminDashboard);

module.exports = router ; 
