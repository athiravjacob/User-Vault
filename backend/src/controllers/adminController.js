const User = require('../models/user')

const dashboard = async (req, res) => {
    try {
        const users =  await User.find({},-password)      
        if (!users) return res.status(400).json({ message: "No users found" }) 
        
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message:"Error getting the users",error})
    }
    
}

const editUser =async(req, res) => {
    try {
        const { id } = req.params
        const updation = req.body
        const updateUser = await User.findByIdAndUpdate(id,updation,{new:true})
        if(updateUser) res.status(200).json({updateUser,message:"User Updated successfully"})
    } catch (error) {
        res.status(500).json(error)
    }
}
const blockUser = async(req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id, "block")
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { block: !user.block },
            { new: true } 
        );
        
        res.status(200).json({
            message: `User has been ${updatedUser.block ? "blocked" : "unblocked"}`,
            user: updatedUser,
          });
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    dashboard,
    editUser,
    blockUser
}