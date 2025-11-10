const userDao = require('../dao/user.dao')

exports.createUser = async (data) => {
    //here our dao code will be called
}

exports.getAllUser = async () => {
    console.log(`Inside getAllIuser service`)
    return await userDao.getAllUsers()
}