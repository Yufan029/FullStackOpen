const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog || !blog.title || !blog.url) {
    return response.status(400).end()
  }

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogRouter