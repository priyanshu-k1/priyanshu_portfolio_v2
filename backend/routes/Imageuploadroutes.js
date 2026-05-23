const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { uploadProjectBanner, uploadProfileImage, handleImageUpload, deleteImage } = require("../controllers/imageUploadController");

router.post("/project-banner", authMiddleware, uploadProjectBanner.single("image"), handleImageUpload);
router.post("/testimonial-profile", authMiddleware, uploadProfileImage.single("image"), handleImageUpload);
router.delete("/", authMiddleware, deleteImage);

module.exports = router;