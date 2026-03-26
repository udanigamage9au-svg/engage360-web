const express = require("express");
const router = express.Router();

const checkinController = require("../controllers/checkinController");

// CHECK-IN ROUTE
router.post("/checkin", checkinController.checkInFacility);

module.exports = router;