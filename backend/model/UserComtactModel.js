const mongoose = require("mongoose");
const UserContactSchema = new mongoose.Schema({
     phone_number: {
            type: String,
            required: [true, "Phone number is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
        },
        about_admin: {
            type: String,
            required: [true, "About admin is required"],
        },
        social_links:{
            facebook:{
                type: String,
            },
            twitter:{
                type: String,
            },
            linkedin:{
                type: String,
            },
            instagram:{
                type: String,
            },
            github:{
                type: String,
            }
        }, 
});

module.exports = mongoose.model("UserContact", UserContactSchema);