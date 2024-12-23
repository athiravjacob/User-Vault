const jwt = require('jsonwebtoken')
const User = require('../models/user')
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'No token provided. Authorization denied.' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {id:decoded.id,role:decoded.role}
        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token. Authorization denied.' });   
    }

}

const isBlocked = async(req, res, next) => {
    try {
        const { id } = req.user
        const user = await User.findById(id,"block")
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
          }
      
          if (user.block) {
            return res.status(403).json({ message: 'Access denied. You are blocked by the admin.' });
          }
    } catch (error) {
        res.status(500).json({ message: 'Error checking block status.', error });

    }
}

const isAdmin = (req, res, next) => {
    const role = req.user.role
    if (role !== "admin") return res.status(403).json({ message: 'Access denied. Admins only.' });
    next()

}
module.exports = { authenticate, isAdmin,isBlocked };
