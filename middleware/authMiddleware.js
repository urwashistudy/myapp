const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    try {
        console.log(`Auth token :[${req.header('Authorization')}]`)
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(`Extracted Token : [${token}]`)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`Decoded data :[${JSON.stringify(decoded)}]`)
        req.userId = decoded.userId
        console.log(req.userId)
        next()
    } catch (err) {
        res.status(401).json({ message: 'UnAuthorized' })
    }
}
module.exports = authMiddleware