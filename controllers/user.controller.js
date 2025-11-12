
const userService = require('../services/user.service')
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    try {
        //here our service will be called
        const userData = req.body;
        const user = await userService.createUser(userData)
        res.json(user)
    } catch (err) {
        if (err.message === 'Invalid user data') {
            console.error(err)
            res.status(400).json({ message: 'Invalid user data' })
        } else {
            console.error(err);
            res.status(500).json({ message: 'Error creating the user' })
        }
    }
}

exports.getAllUsers = async (req, res) => {
    console.log(`Inside getAllUsers controller`)
    try {
        console.log(`req.query`, req.query)
        const { page = 1, limit = 5, search = '' } = req.query
        const users = await userService.getAllUser(page, limit, search)
        res.json(users)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.login = async (req, res) => {
    console.log(`Inside login controller`)
    try {
        const { email, password } = req.body;
        console.log(email, password)
        const { token, user } = await userService.login(email, password);
        res.json({ token, user })
    }
    catch (err) {
        if (err.message === 'Invalid Credentials') {
            res.status(401).json({ message: 'Invalid Credentials' })
        } else {
            console.error(err)
            res.status(500).json({ message: 'Error logging in.' })
        }
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userID = req.params.userId;
        const userData = req.body;
        if (userData.password) {
            console.log(`Passwords============>`, userData.password)
            const hashedPassword = await bcrypt.hash(userData.password, 8)
            userData.password = hashedPassword
            console.log(`userData.password:[${userData.password}]`)
        }
        const updatedUser = await userService.updateUser(userID, userData)
        console.log(updatedUser)
        res.json(updatedUser)
    }
    catch (err) {
        if (err.message === 'User not found') {
            res.status(404).json({ message: 'User not found.' })
        } else if (err.message === 'Invalid user data') {
            res.status(400).json({ message: 'Invalid user data' })
        } else {
            console.error(err)
            res.status(500).json({ message: 'Error updating user' })
        }
    }
}