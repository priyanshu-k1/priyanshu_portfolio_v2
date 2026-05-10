const Message = require('../model/MessageModel');

const getMessage = async (req, res) => {
    try {
        const messages = await Message.find({});
        
        return res.status(200).json({
            success: true,
            length: messages.length,
            data: messages,
            message: "Successfully fetched the messages"
        });

    } catch (error) {
        console.error("[getMessage Error]:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { fname, email, pnumber, message } = req.body;
        if (!fname || !email || !pnumber || !message) {
            return res.status(400).json({
                success: false,
                message: "One or multiple mandatory fields are empty"
            });
        }
        
        const messageData = await Message.create({
            fullname: fname,
            email: email,
            phone_number: pnumber,
            message: message,
        });
        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: messageData
        });

    } catch (error) {
        console.error("[sendMessage Error]:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const messageToDelete = await Message.findOneAndDelete({ message_id: id });
        if (!messageToDelete) {
            return res.status(404).json({
                success: false,
                message: "Message not found!"
            });
        }
        return res.status(200).json({ 
            success: true, 
            message: "Message deleted successfully" 
        });

    } catch (error) {
        console.error("[deleteMessage Error]:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    getMessage,
    sendMessage,
    deleteMessage
};