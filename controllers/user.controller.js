
const userService = require('../services/user.service')
exports.createUser = async (req, res) => {
    try {
        //here our service will be called
    } catch (err) {

    }
}

exports.getAllUsers = async (req, res) => {
    console.log(`Inside getAllUsers controller`)
    try {
        const users = await userService.getAllUser()
        res.json(users)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}