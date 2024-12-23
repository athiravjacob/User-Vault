const express = require('express')
const router = express.Router()
const validate = require('../middleware/validate')
const {signup,signin} = require("../controllers/authController")
const { signupSchema, signInSchema } = require('../validations/authValidation')

router.post("/signin",validate(signInSchema), signin)
router.post("/signup",validate(signupSchema), signup)

module.exports = router