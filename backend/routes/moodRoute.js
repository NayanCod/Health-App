const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/protectedRoute.js");
const { getUserMoods, createUserMood } = require("../controllers/moodController");

// Get all moods of the user in descending order
router.get("/", protectedRoute, getUserMoods);
router.post("/", protectedRoute, createUserMood);

module.exports = router;