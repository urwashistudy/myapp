const User = require('../models/user')

exports.createUser = async (data) => {
    try {
        const user = new User(data);
        await user.save();
        return user
    } catch (err) {
        if (err.name === 'ValidationError') {
            console.log(err)
            throw new Error('Invalid user data')
        }
        throw err
    }
}

exports.updateUser = async (userId, userData) => {
    try {
        const user = await User.findByIdAndUpdate(userId, userData)
        if (!user) {
            throw new Error('User not found')
        }
        return user;
    } catch (err) {
        if (err.name === 'ValidationError') {
            throw new Error('Invalid user data')
        }
        throw err
    }
}

exports.getAllUsers = async () => {
    try {
        console.log(`Inside getAllUsers dao`)
        const users = await User.find();
        return users
    } catch (err) {
        throw err
    }
}

exports.getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found')
        }
        return user;
    } catch (err) {
        throw err
    }
}

exports.getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found')
        }
        return user;
    } catch (err) {
        throw err
    }
}