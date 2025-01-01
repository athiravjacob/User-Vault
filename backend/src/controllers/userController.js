const User = require('../models/user')

//Get details of the user
const getProfile = async (req, res) => {
try {
    const userDetails = await User.findById(req.user.id) 
    if (!userDetails) return res.status(400).json({ message: "No user details" })
    
    res.status(200).json(userDetails)
} catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
}
   
}

//Update User Details

const updateUser = async (req, res) => {
    const { name,email,dob,phoneNumber,profileImage,role,id,gender} = req.body
    console.log("update user backend")
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            name,email,dob,phoneNumber,profileImage,role,id,gender
        }, { new: true })
        console.log(updatedUser)
        if(updateUser) res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}





module.exports = {
    getProfile,
    updateUser
}