const express = require("express");
const authMiddleware = require("../../../middleware/authMiddleware/authMiddleware.js");
const roleMiddleware = require("../../../middleware/roleMiddleware/roleMiddleware.js");
const {updatePlan, getPlan,createPlan, getSinglePlan, deletePlan } = require("../controller/planController.js");
const router =express.Router();


router.use(authMiddleware, roleMiddleware("admin"));

router.post("/", createPlan);
router.get("/", getPlan);
router.get("/:id", getSinglePlan);
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);

module.exports = router ; 
