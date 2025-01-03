const express = require('express')
const { isAdmin ,authenticate} = require('../middleware/authenticate')
const adminController = require('../controllers/adminController')
const router = express.Router()

router.use(authenticate)
router.use(isAdmin);

router.get("/getUsers", adminController.dashboard)
router.post("/editUser/:id", adminController.editUser)
router.post("/createUser",adminController.createUser)
router.patch("/toggleBlock/:id", adminController.blockUser)
router.get("/search",adminController.search)

module.exports = router