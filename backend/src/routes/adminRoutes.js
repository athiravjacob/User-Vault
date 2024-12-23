const express = require('express')
const { isAdmin ,authenticate} = require('../middleware/authenticate')
const adminController = require('../controllers/adminController')
const router = express.Router()

router.use(authenticate)
router.use(isAdmin);

router.get("/dashboard", adminController.dashboard)
router.patch("/editUser/:id", adminController.editUser)
router.patch("/toggleBlock/:id", adminController.blockUser)

module.exports = router