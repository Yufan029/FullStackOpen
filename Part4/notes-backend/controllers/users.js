const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', { content: 1, important: 1 })
  response.status(200).json(users)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length < 4) {
    response.status(400).json({ error: 'Password must be at least 4 characters long' })
  }

  // const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
  // if (!strongPasswordRegex.test(password)) {
  //   return response.status(400).json({ error: 'Password must include uppercase, lowercase, number, and special character' })
  // }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = userRouter