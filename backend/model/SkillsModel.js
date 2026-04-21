const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
    skills_name:{
        type: String,
        required: [true, "Skills name is required"],
        trim: true,
        required: true,
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
    skill_icon_url: {
        type: String,
        trim: true,

    },
});

module.exports = mongoose.model("Skills", skillsSchema);