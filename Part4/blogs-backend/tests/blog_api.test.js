const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const testData = require('./test_data')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')
const { log } = require('node:console')

const api = supertest(app)

describe('blog api tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testData.blogs)
  })

  test('get all, return 200, json formate', async () => {
    log('test start here')
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('get all, return specific items', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, testData.blogs.length)
  })

  test('get all, author includes Edsger W. Dijkstra', async () => {
    const response = await api.get('/api/blogs')
    const authors = response.body.map(blog => blog.author)

    assert(authors.includes('Edsger W. Dijkstra'))
  })

  test('unique identifier is id', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    assert(Object.hasOwn(firstBlog, 'id'))
  })

  test('post one, length increase, content exists in db', async () => {
    await api
      .post('/api/blogs')
      .send(testData.oneNormalBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const blogs = await helper.blogsInDb()
    assert.strictEqual(blogs.length, testData.blogs.length + 1)

    const titles = blogs.map(blog => blog.title)
    assert(titles.includes('Go To Statement Considered Harmful'))
  })

  test('post missing like blog', async () => {
    const response = await api
      .post('/api/blogs')
      .send(testData.blogMissingLikeProperty)

    assert.strictEqual(response.body.likes, 0)
  })

  test('post blog without title, status 400 received', async () => {
    await api
      .post('/api/blogs')
      .send(testData.blogWithoutTitle)
      .expect(400)
  })

  test('post blog without url, status 400 received', async () => {
    await api
      .post('/api/blogs')
      .send(testData.blogWithoutUrl)
      .expect(400)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})