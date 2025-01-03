const User = require('../models/user')
const bcrypt = require('bcryptjs');

const dashboard = async (req, res) => {
    try {
        const users = await User.find({role:"user"}, { password: 0 });
        if (!users) return res.status(400).json({ message: "No users found" }) 
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message:"Error getting the users",error})
    }
    
}

const editUser = async (req, res) => {
    const { name,email,dob,phoneNumber,profileImage,role,_id,gender} = req.body
    console.log("update user backend")
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            name,email,dob,phoneNumber,profileImage,role,gender
        }, { new: true })
        console.log(updatedUser) 
        if(updatedUser) res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


const blockUser = async(req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id, "block")
        console.log("hello block user",id)
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { block: !user.block },
            { new: true } 
        );
        console.log(updatedUser.block)
        res.status(200).json({
            message: `User has been ${updatedUser.block ? "blocked" : "unblocked"}`,
            user: updatedUser,
          });
    } catch (error) {
        res.status(500).json(error)
    }
}
const search = async (req, res) => {
    try {
        const term = req.query.searchTerm.trim()
        if (!term ) {
            const users = await User.find({role:"user"})
            return      res.status(200).json(users);

        }

        const users = await User.find({
            name: { $regex: `^${term}`, $options: 'i' },
            role:"user"
        })
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: 'Error occurred during search.' });

    }
}

const createUser = async (req, res) => {
    const {name,email,dob,phoneNumber,profileImage,password,gender } = req.body
    console.log(req.body)
    console.log("hello fom crreate user");
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "User already exists" })
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user",
            gender,
            profileImage,
            phoneNumber,dob
        })

        if (newUser) {
            res.status(200).json({
                message: "new user added"
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Error creating new user" , error})
    }
    
}


module.exports = {
    dashboard,
    editUser,
    blockUser,
    search,
    createUser
}