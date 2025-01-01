const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { authenticate, isBlocked } = require('../middleware/authenticate')

router.use(authenticate)
// router.use(isBlocked)
router.get('/profile', userController.getProfile)
router.post('/update', userController.updateUser)

module.exports = router