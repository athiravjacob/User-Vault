const express = require('express')
const router = express.Router()
const Validate = require('../middleware/validate')
const {signup,signin} = require("../controllers/authController")
const { signupSchema, signInSchema } = require('../validations/authValidation')
const { validate } = require('../models/user')

router.post("/signin",validate(signInSchema), signin)
router.post("/signup",Validate(signupSchema), signup)

module.exports = router