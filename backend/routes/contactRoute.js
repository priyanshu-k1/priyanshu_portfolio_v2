const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware') 
const {getContact,addContact,editContact} = require('../controllers/userContactController')

router.get('/getcontactdetails',getContact);

router.post('/addcontactdetails',authMiddleware,addContact);
router.put('/editcontactdetails/:id',authMiddleware,editContact);



module.exports = router;