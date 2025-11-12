const userDao = require('../dao/user.dao')
const jwt = require('jsonwebtoken')

exports.createUser = async (data) => {
    //here our dao code will be called
    try {
        const user = await userDao.createUser(data);
        return user
    } catch (err) {
        if (err.message === 'Invalid user data') {
            console.log(err)
            throw new Error('Invalid user data')
        }
        throw err;
    }
}

exports.getAllUser = async (page, limit, search) => {
    console.log(`Inside getAllIuser service`)
    try {
        const skip = (page - 1) * limit;
        const users = await userDao.getAllUsers(skip, limit, search);
        const total = await userDao.getCount(search)
        return {
            users, pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        }
    } catch (err) {
        throw err
    }
}

exports.login = async (email, password) => {
    console.log(`inside login service`)
    try {
        const user = await userDao.getUserByEmail(email);
        const passwordComparision = await user.comparePassword(password)
        console.log(passwordComparision)
        if (!passwordComparision) {
            throw new Error('Invalid Credentials')
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        return { token, user }
    } catch (err) {
        throw err
    }
}

exports.updateUser = async (userId, userData) => {
    try {
        const updatedUser = await userDao.updateUser(userId, userData)
        return updatedUser
    }
    catch (err) {
        if (err.message === 'Invalid user data')
            throw new Error('Invalid user data')
        throw err
    }

}