var express = require('express');
var router = express.Router();
const User = require('../models/user');

let users = [
  { id: 1, name: 'test', email: 'test@gmail.com' },
  { id: 2, name: 'test two', email: 'test.two@gmail.com' }
]
/* GET users listing. */
router.get('/', async (req, res, next) => {
  // res.json(users)
  const users = await User.find();
  res.json(users)
});

router.get('/:id', async (req, res, next)=> {
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

router.put('/:id', function (req, res, next) {
  const userId = parseInt(req.params.id)
  const { name, email } = req.body;
  const user = users.find(u => u.id === userId)
  if (!user)
    return res.status(404).json({ message: 'User not found' })
  if (name) user.name = name;
  if (email) user.email = email
  res.json(user)
})

router.delete('/:id', function (req, res, next) {
  const userId = parseInt(req.params.id);
  users = users.filter(u => u.id !== userId);
  res.status(204).send()
})

module.exports = router;
