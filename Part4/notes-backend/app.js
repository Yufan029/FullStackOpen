const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

const connectDB = async () => {
  try {
    logger.info('connecting to MongoDB')
    await mongoose.connect(config.MONGODB_URI)
    logger.info('connected to MongoDB')
  } catch (error) {
    logger.error('error connection to MongoDB', error.message)
    process.exit(1)
  }
}

connectDB()

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app