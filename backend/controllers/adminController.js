const Admin = require("../model/AdminDataModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "username, email, and password are all required." });
    }

    const admin = await Admin.create({ username, email, password });
    return res.status(201).json({
      message: "Admin account created successfully.",
      admin: admin.toSafeObject(),
    });

  } catch (error) {
    if (error.message.includes("Only one admin is allowed")) {
      return res.status(409).json({ message: error.message });
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({ message: `${field} is already in use.` });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (!admin.isActive) {
      return res.status(403).json({ message: "This account has been deactivated." });
    }
    await Admin.findByIdAndUpdate(admin._id, { lastLogin: new Date() });

    const token = generateToken(admin._id);

    return res.status(200).json({
      message: "Login successful.",
      token,
      admin: admin.toSafeObject(),
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
const getMe = (req, res) => {
  return res.status(200).json({ admin: req.admin.toSafeObject() });
};

module.exports = { signup, login, getMe };