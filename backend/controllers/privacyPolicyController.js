const mongoose = require("mongoose");
const PrivacyPolicy = require("../model/PrivacyPolicyModel");

const EDITABLE_FIELDS = ["header", "summary", "email", "sections", "highlights"];

const pickEditable = (body = {}) =>
  EDITABLE_FIELDS.reduce((acc, key) => {
    if (body[key] !== undefined) acc[key] = body[key];
    return acc;
  }, {});

const handleError = (res, error, action) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(error.errors).map((e) => e.message),
    });
  }
  if (error.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid data format" });
  }
  console.error(`Failed to ${action} privacy policy:`, error);
  return res
    .status(500)
    .json({ success: false, message: `Failed to ${action} privacy policy` });
};
const fetchPolicy = async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findOne().sort({ updatedAt: -1 }).lean();

    if (!policy) {
      return res
        .status(404)
        .json({ success: false, message: "Privacy policy not found" });
    }

    return res.status(200).json({ success: true, data: policy });
  } catch (error) {
    return handleError(res, error, "fetch");
  }
};
const addPolicy = async (req, res) => {
  try {
    const existing = await PrivacyPolicy.exists({});
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "A privacy policy already exists. Use the update route instead.",
        id: existing._id,
      });
    }

    const policy = await PrivacyPolicy.create({
      ...pickEditable(req.body),
      lastUpdated: new Date(),
    });

    return res.status(201).json({ success: true, data: policy });
  } catch (error) {
    return handleError(res, error, "add");
  }
};
const updatePolicy = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid policy id" });
    }

    const updates = pickEditable(req.body);
    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No valid fields provided to update" });
    }

    const policy = await PrivacyPolicy.findById(id);
    if (!policy) {
      return res
        .status(404)
        .json({ success: false, message: "Privacy policy not found" });
    }

    policy.set(updates);
    policy.lastUpdated = new Date(); 
    await policy.save();

    return res.status(200).json({ success: true, data: policy });
  } catch (error) {
    return handleError(res, error, "update");
  }
};

module.exports = { fetchPolicy, addPolicy, updatePolicy };