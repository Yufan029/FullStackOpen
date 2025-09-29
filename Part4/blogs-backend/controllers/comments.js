const express = require('express')
const Comment = require('../models/comment')
const Blog = require('../models/blog')

const commentsRouter = express.Router({ mergeParams: true })

commentsRouter.get('/', async (request, response) => {
  const blogId = request.params.id
  if (!blogId) {
    return response.status(400).json({ error: 'Wrong blog id' })
  }

  const comments = await Comment.find({ blog: blogId })
  return response.json(comments)
})

commentsRouter.post('/', async (request, response) => {
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  if (!blog) {
    return response.status(400).json({ error: 'Invalid blog id' })
  }

  const { content } = request.body
  const newComment = new Comment({ content, blog: blog._id })
  const result = await newComment.save()
  console.log('saved comments:', result)

  blog.comments = blog.comments.concat(result._id)
  await blog.save()
  response.json(result)
})

module.exports = commentsRouter
