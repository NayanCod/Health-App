const express = require("express");
const router = express.Router();
const { googleLogin } = require("../controllers/authController.js");

// Google login route
router.post("/google-login", googleLogin);

module.exports = router;