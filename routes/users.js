var express = require('express');
var router = express.Router();
const User = require('../models/user');
const userController = require('../controllers/user.controller')

router.get('/', userController.getAllUsers)


/* GET users listing. */
// router.get('/', async (req, res, next) => {
//   // res.json(users)
//   const users = await User.find();
//   res.json(users)
// });


router.get('/:id', async (req, res, next) => {
  console.log(req.params.id)
  const userId = req.params.id
  const user = await User.findById(userId)
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json(user)
});

router.post('/', async (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' })
  }
  const newUser = new User(req.body)
  await newUser.save()
  res.status(201).json(newUser)
})

router.put('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id
    const updates = req.body
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true
    })
    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' })
    }
    res.send(updatedUser)
  } catch (err) {
    console.error(err)
    res.status(400).send({ message: 'Error updating this user' })
  }

})

router.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId)
    res.status(204).send()
  }
  catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Error while deleting the user' })
  }
})

module.exports = router;
