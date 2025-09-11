const Blog = require('../models/blog')
const User = require('../models/user')

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistId = async () => {
  const blog = new Blog({
    title: 'title',
    author: 'author',
    url: 'http://localhost',
    likes: 6
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  blogsInDb,
  nonExistId,
  usersInDb,
}