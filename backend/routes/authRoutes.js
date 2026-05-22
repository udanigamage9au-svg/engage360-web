const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");


// TEST ROUTE (check API working)
router.get("/", (req, res) => {
  res.send("Auth API working ");
});

// GET ALL USERS (testing/debug)
router.get("/users", authController.getUsers);

// SIGNUP
router.post("/signup", authController.signup);

// LOGIN
router.post("/login", authController.login);

module.exports = router;