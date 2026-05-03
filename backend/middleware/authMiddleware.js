const jwt = require("jsonwebtoken");
const Admin = require("../model/AdminDataModel");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided. Access denied." });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin account not found. Token invalid." });
    }
    if (!admin.isActive) {
      return res.status(403).json({ message: "Admin account is deactivated. Access denied." });
    }
    req.admin = admin;
    next();
  } 
  catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token." });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired. Please log in again." });
    }
    return res.status(500).json({ message: "Internal server error during authentication." });
  }
};

module.exports = authMiddleware;