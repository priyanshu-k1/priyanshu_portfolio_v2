const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {addMajorProject,addMinorProject,fetchProjects,updateProject,deleteProject} = require('../controllers/projectController')

// Public route
router.get('/getprojects',fetchProjects);

// Private route
router.post('/addmajorproject',authMiddleware,addMajorProject);
router.post('/addminorproject',authMiddleware,addMinorProject);
router.delete('/deleteproject/:id',authMiddleware,deleteProject);
router.put('/updateproject/:id',authMiddleware,updateProject);




module.exports = router;