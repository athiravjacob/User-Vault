const Joi = require('joi')

const signupSchema = Joi.object({
    profileImage: Joi.string().uri().optional().messages({
        "string.uri" :"Profile Image must be a valid uri"
    }),
    name: Joi.string().min(3).max(30).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long.",
        "string.max": "Name cannot be longer than 30 characters."
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required.",
        "string.email": "Email must be a valid email address.",
    }),
    password: Joi.string().min(6).max(30).required().messages({
        "string.empty": "Password is required.",
        "string.min": "Password must be at least 6 characters long.",
        "string.max": "Password cannot be longer than 30 characters.",
    }),
    confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match.",
      "string.empty": "Confirm password is required.",
    }),

})




const signInSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long.',
    'any.required': 'Password is required.',
  }),
});


module.exports = {
    signupSchema,
    signInSchema
}