const express = require('express');
const   router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {getMessage,sendMessage,deleteMessage} = require('../controllers/mesageController');




router.get("/getmessage",authMiddleware,getMessage);
router.post("/postmessage",sendMessage);
router.delete("/deletemessage/:id",authMiddleware,deleteMessage);



module.exports = router;