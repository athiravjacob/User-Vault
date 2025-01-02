const bcrypt = require('bcryptjs');
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    const { name, email, password } = req.body
    console.log(req.body)
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "User already exists" })
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user"
        })

        res.status(200).json({
            message: "user sign up sucess", user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
           }})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Error during signup" , error})
    }
    
}

const signin =async(req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    try {
        const user = await User.findOne({ email })
        const isMatch = await bcrypt.compare(password,user.password)
        if (!user || !isMatch) return res.status(400).json({ message: "Invalid credentials" })
        if(user.block) return res.status(400).json({message:"You are blocked by admin"})
        const token = await jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        )

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
              },
        })
    } catch (error) {
        res.status(500).json({ message: 'Error during sign-in', error });
   
    }
}

module.exports = {
    signup,
    signin
}