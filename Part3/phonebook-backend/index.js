require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())

// This server will provide the static files from this directory,
// when browser access root directory, the dist/index.html will be served which is the frontend client
// then the index.html will send the request from browser to server to request the js and css file,
// the server will serve the static files(js, css files) from the dist directory,
// then the js send back to client(browser), it will trigger the retrieve data via js script, 
// get into the /api/person address to grab the data.
app.use(express.static('dist'))

morgan.token('content', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
//app.use(morgan('tiny'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response, next) => {
    Person.find({}).then(persons => {
        const content = `<div>Phonebook has info for <strong style="font-size:x-large">${persons.length}</strong> people</div>
                         <p>${new Date()}</p>`
        response.send(content);
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            console.log(person)
            response.json(person)
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const {name, number} = request.body

    if (!name || !number) {
        return response.status(400).json({error: 'Name and number need to provid'})
    }

    const person = new Person({ name, number })
    person.save()
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
    Person.findById(request.params.id).then(person => {
        if (!person) {
            return response.status(400).json({ error: 'No person founded'})
        } else {
            person.number = number

            person.save().then(savedPerson => {
                response.json(savedPerson)
            })
            .catch(error => next(error))
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(person => {
            if (!person) {
                response.status(204).end()
            } else {
                response.json(person)
            }
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).end()
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    console.log('error name:', error.name)
    if (error.name === 'CastError') {
        response.status(400).json({error: 'Bad request'})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server start at prot ${PORT}`)
})