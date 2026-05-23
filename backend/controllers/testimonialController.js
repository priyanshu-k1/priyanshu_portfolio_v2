const Testimonial = require("../model/TestimonialsModel");

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().select("-__v");
    res.status(200).json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch testimonials." });
  }
};

const createTestimonial = async (req, res) => {
  try {
    const { title, description, status, image_url, project_meta } = req.body;
    const testimonial = await Testimonial.create({ title, description, status, image_url, project_meta });
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: "Failed to create testimonial." });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Testimonial.findOneAndUpdate(
      { testimonial_id: id },
      req.body,
      { new: true, runValidators: true }
    ).select("-__v");
    if (!updated) {
      return res.status(404).json({ success: false, message: "Testimonial not found." });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: "Failed to update testimonial." });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Testimonial.findOneAndDelete({ testimonial_id: id });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Testimonial not found." });
    }
    res.status(200).json({ success: true, message: "Testimonial deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete testimonial." });
  }
};

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };