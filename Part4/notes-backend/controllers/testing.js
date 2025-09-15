const router = require('express').Router()
const Node = require('../models/note')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Node.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router