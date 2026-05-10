const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {addProject,fetchProjects,updateProject,deleteProject} = require('../controllers/projectController')

// Public route
router.get('/getprojects',fetchProjects);

// Private route
router.post('/addproject',authMiddleware,addProject);
router.delete('/deleteproject/:id',authMiddleware,deleteProject);
router.put('/updateproject/:id',authMiddleware,updateProject);




module.exports = router;