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
        resume_link:{
            word_link: {
                type:String,
                require:[true,"Word links are required."],
                default:"https://drive.google.com/uc?export=download&id=1QzehQxLRRcPlIG9CjVCxZ-zTZ7QQhxdq"
            },
            pdf_link: {
                type:String,
                require:[true,"PDF links are required."],
                default:"https://drive.google.com/uc?export=download&id=1-4smRMVFS7QPZYxpwLaLSBNpCil5JVYG"
            }
        }
});

module.exports = mongoose.model("UserContact", UserContactSchema);