const jwt = require('jsonwebtoken')
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split('')[1]
    if (!token) return res.status(401).json({ message: 'No token provided. Authorization denied.' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token. Authorization denied.' });   
    }

}


const isAdmin = (req, res, next) => {
    const role = req.user.role
    if (role !== "admin") return res.status(403).json({ message: 'Access denied. Admins only.' });
    next()

}
module.exports = { authenticate, isAdmin };
