const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const skillsSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    skills_name: {
        type: String,
        required: [true, "Skills name is required"],
        trim: true,
    },
    is_major_skill: {
        type: Boolean,
        default: false,
    },
    sub_skills: [
        {
            type: String,
            trim: true,
        },
    ],
    skill_icon: {
        icon_url: {
            type: String,
            required: [true, "Skill icon URL is required"],
            trim: true,
            default: null,
        },
        is_monochrome: {
            type: Boolean,
            default: false,
        },
    },
});

module.exports = mongoose.model("Skills", skillsSchema);