const express = require("express");
const authMiddleware = require("../../../middleware/authMiddleware/authMiddleware.js");
const roleMiddleware = require("../../../middleware/roleMiddleware/roleMiddleware.js");
const {updateService, getService,createService, getSingleService, deleteService } = require("../controller/serviceController.js");
const router =express.Router();


router.use(authMiddleware, roleMiddleware("admin"));

router.post("/", createService);
router.get("/", getService);
router.get("/:id", getSingleService);
router.delete("/:id", deleteService);
router.put("/:id", updateService);

module.exports = router ; 