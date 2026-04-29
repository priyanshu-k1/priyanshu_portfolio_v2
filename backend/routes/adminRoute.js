const express = require("express");
const router = express.Router();
const { signup, login, getMe } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.get("/me", authMiddleware, getMe);

module.exports = router;