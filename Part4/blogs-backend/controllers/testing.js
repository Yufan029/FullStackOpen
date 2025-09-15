const testRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

testRouter.post('/reset', async (request, response) => {
  console.log('reset blogs and users database')
  await Blog.deleteMany({})
  await User.deleteMany({})
  response.status(204).end()
})

module.exports= testRouter