const moongose = require('mongoose');

const projectSchema = new moongose.Schema({
    project_name: {
        type: String,
        required: [true, "Project name is required"],
        trim: true,
    },
    project_description: {
        type: String,
        required: [true, "Project description is required"],
        trim: true,
    },
    project_url: {
        type: String,
        trim: true,
    },
    project_image_url: {
        type: String,
        trim: true,

    },
    project_type:{
        is_major_project: {
            type: Boolean,
            default: false,
        },
        is_featured_project: {
            type: Boolean,
            default: false,
        },
    },
    tech_stack: [
        {
            type: String,
            trim: true,
            required: true,
        },
    ],
});

module.exports = moongose.model("Project", projectSchema);