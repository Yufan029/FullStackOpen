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
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Bad request - Cast error' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: 'Bad request - Validation error' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}