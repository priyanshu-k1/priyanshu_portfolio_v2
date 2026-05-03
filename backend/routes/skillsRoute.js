const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { addSkills, deleteSkill, updateSkill, getSkills } = require("../controllers/skillsController.js");

// Private/authenticated routes
router.post('/addSkill', authMiddleware, addSkills);
router.delete('/deleteSkill/:id', authMiddleware, deleteSkill);
router.put('/updateSkill/:id', authMiddleware, updateSkill);

// Public routes
router.get('/getSkills', getSkills);

module.exports = router;