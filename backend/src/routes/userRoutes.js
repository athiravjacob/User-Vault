const express = require('express')
const router = express.router()
const userController = require('../controllers/userController')
const { authenticate, isBlocked } = require('../middleware/authenticate')

router.use(authenticate)
router.use(isBlocked)
router.get('/profile', userController.getProfile)
router.patch('/update', userController.updateUser)

