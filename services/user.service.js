const userDao = require('../dao/user.dao')

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

exports.getAllUser = async () => {
    console.log(`Inside getAllIuser service`)
    return await userDao.getAllUsers()
}