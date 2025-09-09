require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express();

app.use(express.json())
app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
      content: body.content,
      important: body.important || false,
    })

    note.save().then(savedNote => {
      response.json(savedNote)
    })
})

app.delete('/api/notes/:id', (request, response) => {
    Note
      .findByIdAndDelete(request.params.id)
      .then(deletedNote => {
        if (!deletedNote) {
          response.status(400).json({ error: 'No content' })
        } else {
          response.json(deletedNote)
        }
      })
      .catch(error => {
        console.error('Error when delete user:', error)
      })
})

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})