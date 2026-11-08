const express = require('express')


const authMiddleware = require("../middleware/authMiddleware");
const {fetchPolicy,addPolicy,updatePolicy} = require("../controllers/privacyPolicyController")
const router = express.Router()

// Public route for fetching the policy
router.get('/get',fetchPolicy)
// authenticated route for admin access.
router.post('/add-policy',authMiddleware,addPolicy)
router.put('/update-policy/:id',authMiddleware,updatePolicy)


module.exports = router