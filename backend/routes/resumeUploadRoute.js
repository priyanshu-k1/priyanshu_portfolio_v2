const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const {uploadResume} = require('../controllers/resumeUploadController')

router.post("/resume", authMiddleware, uploadResume);



module.exports = router;