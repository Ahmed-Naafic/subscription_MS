const express = require("express");
const authMiddleware = require("../../../middleware/authMiddleware/authMiddleware.js");
const roleMiddleware = require("../../../middleware/roleMiddleware/roleMiddleware.js");
const {getUsers, updateUser,deleteUser } = require("../controller/userController.js");
const router =express.Router();


router.use(authMiddleware, roleMiddleware("admin"));

router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router ; 
