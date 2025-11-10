const User = require('../models/user')

exports.createUser = async (data) => {

}

exports.getAllUsers = async () => {
    console.log(`Inside getAllUsers dao`)
    return await User.find()
}