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

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blogForUpdate = await Blog.findById(request.params.id)

  if (!blogForUpdate) {
    response.status(400).end()
  }

  blogForUpdate.title = title
  blogForUpdate.author = author
  blogForUpdate.url = url
  blogForUpdate.likes = likes

  const result = await blogForUpdate.save()
  response.status(200).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter