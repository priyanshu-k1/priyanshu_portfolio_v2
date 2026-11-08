const mongoose = require("mongoose");

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sectionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [SLUG_REGEX, "Section id must be a slug, e.g. 'external-websites'"],
    },
    title: { type: String, required: true, trim: true },
    paragraphs: {
      type: [{ type: String, trim: true }],
      required: true,
      validate: {
        validator: (items) =>
          Array.isArray(items) &&
          items.length > 0 &&
          items.every((p) => typeof p === "string" && p.trim().length > 0),
        message: "Each section needs at least one non-empty paragraph",
      },
    },
  },
  { _id: false }
);

const highlightSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const privacyPolicySchema = new mongoose.Schema(
  {
    header: { type: String, trim: true, default: "Privacy Policy" },
    summary: { type: String, trim: true },
    email: {
      type: String,
      trim: true,
      match: [EMAIL_REGEX, "Please provide a valid email address"],
    },
    lastUpdated: { type: Date, default: Date.now },
    sections: {
      type: [sectionSchema],
      required: true,
      validate: [
        {
          validator: (items) => Array.isArray(items) && items.length > 0,
          message: "At least one section is required",
        },
        {
          validator: (items) => {
            const ids = items.map((s) => s.id);
            return new Set(ids).size === ids.length;
          },
          message: "Section ids must be unique",
        },
      ],
    },
    highlights: { type: [highlightSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PrivacyPolicy", privacyPolicySchema);