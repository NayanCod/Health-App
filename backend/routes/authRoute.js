const express = require("express");
const router = express.Router();
const { googleLogin, getUserProfile } = require("../controllers/authController.js");
const protectedRoute = require("../middlewares/protectedRoute.js");

// Google login route
router.post("/google-login", googleLogin);
router.get("/profile", protectedRoute, getUserProfile)

module.exports = router;