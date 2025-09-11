const logger = require('./logger')

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
    return response.status(400).json({ error: 'Bad request - Validation error' })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expect username to be unique' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}