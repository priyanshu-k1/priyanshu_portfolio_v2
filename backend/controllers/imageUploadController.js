const multer = require("multer");
const { cloudinary, createStorage } = require("../config/cloudinary");

const uploadProjectBanner = multer({
  storage: createStorage("portfolio/project-banners"),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadProfileImage = multer({
  storage: createStorage("portfolio/testimonial-profiles"),
  limits: { fileSize: 2 * 1024 * 1024 },
});

const extractPublicId = (imageUrl) => {
  const url = new URL(imageUrl);
  const parts = url.pathname.split("/");
  const uploadIndex = parts.indexOf("upload");
  const relevantParts = parts.slice(uploadIndex + 2);
  const last = relevantParts[relevantParts.length - 1];
  relevantParts[relevantParts.length - 1] = last.split(".")[0];
  return relevantParts.join("/");
};

const handleImageUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image file provided" });
  }
  const imageUrl = req.file.secure_url || req.file.path;
  return res.status(200).json({ success: true, imageUrl });
};

const deleteImage = async (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ success: false, message: "Image URL is required" });
  }
  try {
    const publicId = extractPublicId(imageUrl);
    await cloudinary.uploader.destroy(publicId);
    return res.status(200).json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete image", error: error.message });
  }
};

module.exports = { uploadProjectBanner, uploadProfileImage, handleImageUpload, deleteImage };