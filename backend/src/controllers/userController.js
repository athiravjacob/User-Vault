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
    const {name,profileImage} = req.body
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            name,profileImage
        },{new:true})
        if(updateUser) res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}





module.exports = {
    getProfile,
    updateUser
}