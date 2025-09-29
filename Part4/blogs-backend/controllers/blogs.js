const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  if (!title || !author || !url) {
    return response
      .status(400)
      .json({ error: 'title, author or url cannot be empty' })
  }

  console.log('request.token ================================>', request.token)

  // request user is assigned in the userExtractor middleware
  const user = request.user

  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
    comments: [],
  })
  const savedBlog = await newBlog.save()

  // also save the blog id to the associated user
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const returnedBlog = await Blog.findById(savedBlog.id).populate('user', {
    username: 1,
    name: 1,
  })

  response.status(201).json(returnedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blogForUpdate = await Blog.findById(request.params.id)
  console.log(request.params.id)
  if (!blogForUpdate) {
    response.status(400).end()
  }

  blogForUpdate.title = title
  blogForUpdate.author = author
  blogForUpdate.url = url
  blogForUpdate.likes = likes

  const result = await blogForUpdate.save()
  console.log(result)
  response.status(200).json(result)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(400).json({ error: 'Invalid blog id' })
  }

  if (blog.user.toString() !== request.user._id.toString()) {
    return response.status(401).json({ error: 'Unauthorized user' })
  }

  const comments = await Comment.find({ blog: blog._id })
  console.log('dddddddddddddddddddddddd', comments)
  await Comment.deleteMany({ blog: blog._id })

  await blog.deleteOne()
  response.status(204).end()
})

module.exports = blogsRouter
