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

exports.getAllUsers = async (skip, limit, search) => {
    try {
        const query = {}
        console.log(`Inside getAllUsers dao`)
        if (search) {
            query.$or = [
                { name: { $regex: search } },
                { email: { $regex: search } }
            ]
        }
        const project = 'email'
        const users = await User.find(query).select(project).skip(skip).limit(limit).exec();
        return users
    } catch (err) {
        throw err
    }
}

exports.getCount = async (search) => {
    try {
        const query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search } },
                { email: { $regex: search } }
            ]
        }
        const count = await User.countDocuments(query)
        return count
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
    console.log(`Inside getUserByEmail`)
    try {
        console.log(email)
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            throw new Error('User not found')
        }
        return user;
    } catch (err) {
        throw err
    }
}