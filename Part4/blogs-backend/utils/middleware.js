const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Request method', request.method)
  logger.info('Request path', request.path)
  logger.info('Request body', request.body)
  logger.info('---------------------')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'Page not found' })
}

const errorHandler = (error, request, response, next) => {
  logger.error('error message ===============>', error.message)
  logger.error('error name ===============>', error.name)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Bad request - Cast error' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expect username to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('Authorization')
  if (auth && auth.startsWith('Bearer ')) {
    request.token = auth.replace('Bearer ', '')
  }

  next()
}

const userExtractor = async (request, response, next) => {
  const auth = request.get('Authorization')

  if (auth && auth.startsWith('Bearer ')) {
    const { id } = jwt.verify(auth.replace('Bearer ', ''), process.env.SECRET)
    if (!id) {
      return response.status(401).json({ error: 'Token invalid' })
    }

    const user = await User.findById(id)
    if (!user) {
      return response.status(400).json({ error: 'User not exist' })
    }

    // assign the user to request object for further use in blogs controller
    request.user = user

    next()
  } else {
    return response.status(401).json({ error: 'Please login' })
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}