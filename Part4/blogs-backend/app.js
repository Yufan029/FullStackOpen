const express = require('express')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

const connectDB = async () => {
  try {
    logger.info('Connecting MongDB')
    await mongoose.connect(config.MONGODB_URI)
    logger.info('MongDB connect successfully')
  } catch (error) {
    logger.error('MongDB connect fail, ', error.message)
    process.exit(1)
  }
}

connectDB()

// logger.info('connecting to MongoDB')
// mongoose
//   .connect(config.MONGODB_URI)
//   .then(() => {
//     logger.info('connected to MongoDB')
//   })
//   .catch(error => {
//     logger.error('error connection to MongoDB', error.message)
//   })

app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app