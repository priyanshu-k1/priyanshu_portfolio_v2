const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");



const TestimonialsSchema = new mongoose.Schema({
    testimonial_id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String,
        enum: ['published', 'draft'],
        default: 'draft'
    },
    image_url: {
        type: String,
        trim: true,
        required: true
    },
    project_meta: {
        project_type: {
            type: String,
            trim: true,
            required: true
        },
        project_link: {
            type: String,
            trim: true,
            required: true
        },
        client_name: {
            type: String,
            trim: true,
            required: true
        },
        feedback_stars: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        }

    }
},
{ timestamps: true });


module.exports = mongoose.model("Testimonials", TestimonialsSchema);

