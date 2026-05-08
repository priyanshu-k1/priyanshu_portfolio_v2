const express = require("express");
const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");
const { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } = require("../controllers/testimonialController");

router.get("/", getTestimonials);
router.post("/create", authMiddleware, createTestimonial);
router.put("/:id", authMiddleware, updateTestimonial);
router.delete("/:id", authMiddleware, deleteTestimonial);

module.exports = router;