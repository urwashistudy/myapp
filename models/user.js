const mongoose = require('mongoose')
//bcryptjs jsonwebtoken validator

const userSchema = new mongoose.Schema({
    name: String,
    email: String
})

module.exports = mongoose.model('User', userSchema)