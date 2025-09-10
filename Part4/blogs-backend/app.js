const express = require('express')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blog')

const app = express()

logger.info('Connecting MongDB')
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('MongDB connect successfully')
  })
  .catch(error => {
    logger.error('MongDB connect fail, ', error.message)
  })

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app