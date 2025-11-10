const mongoose = require('mongoose')
//bcryptjs jsonwebtoken validator
const validator = require('validator');
const bcryptjs = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at lease 2 characters long'],
        maxlength: [50, 'Name must be at most 50 character long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 character long']
    }
})

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 8)
    }
    next();
})

userSchema.methods.comparePassword = async function (password) {
    const user = this;
    return await bcryptjs.compare(password, user.password)
}

module.exports = mongoose.model('User', userSchema)