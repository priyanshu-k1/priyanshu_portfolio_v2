const moongose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const messageSchema = new moongose.Schema({
    message_id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    fullname: {
        type: String,
        required: [true, "Full name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true
    },
    phone_number: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true
    },
    message:{
        type: String,
        required: [true, "Message is required"],
        trim: true
    }
},{ timestamps: true });

module.exports = moongose.model("Message", messageSchema);