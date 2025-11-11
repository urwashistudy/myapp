
const userService = require('../services/user.service')

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
        const users = await userService.getAllUser()
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