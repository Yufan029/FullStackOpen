const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  // find the user if exist
  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? null
    : await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return response.status(401).json({ error: 'username or password incorrect' })
  }

  const payload = {
    username: username,
    id: user.id
  }

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 60 * 60 })

  response.status(200).send({ token: token, username: user.username, name: user.name })
})

module.exports = loginRouter