const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const User = require('../models/user')
const mongoose = require('mongoose')
const app = require('../app')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const { log } = require('node:console')

const api = supertest(app)

describe('users api test', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const hashedPassword = await bcrypt.hash('1234', 10)
    const user = new User({
      username: 'username',
      name: 'name',
      passwordHash: hashedPassword
    })

    await user.save()
  })

  test('add user success, expect 201, json', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testusername',
      name: 'testname',
      password: '1233',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    assert.strictEqual(response.body.username, newUser.username)
  })

  test('add user fail, password too short', async () => {
    const user = {
      username: 'testusername',
      name: 'testname',
      password: '1',
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    log('response.body.error ===> ', response.body.error)
    assert.strictEqual(response.body.error, 'Password needs at least 3 characters long')
  })

  test('add user fail, username too short', async () => {
    const user = {
      username: 'te',
      name: 'testname',
      password: '14344',
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    log('response.body ===> ', response.body)
    assert.strictEqual(response.body.error, 'Bad request - Validation error')
  })

  test('add user fail, username should be unique', async () => {
    const user = {
      username: 'username',
      name: 'testname',
      password: '14344',
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    assert.strictEqual(response.body.error, 'expect username to be unique')
  })
})

after(async () => {
  await mongoose.connection.close()
})