require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const app = express()
//app.use(morgan('tiny'))
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

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    response.send(`
        <div>Phonebook has info for ${persons.length} people</div>
        <p>${new Date()}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            console.log(person)
            response.json(person)
        })
        .catch(error => {
            response.status(400).json({ error: 'No content' })
        })
})

app.post('/api/persons', (request, response) => {
    const {name, number} = request.body

    if (!name || !number) {
        return response.status(400).json({error: 'Name and number need to provid'})
    }

    const person = new Person({ name, number })
    person.save()
        .then(person => {
            response.json(person)
        })
        .catch(error => {
            response.status(400).json({ error: 'Fail to create' })
        })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(person => {
            if (!person) {
                response.status(400).json({ error: 'No content' })
            } else {
                response.json(person)   
            }
        })
        .catch(error => {
            response.status(400).json({ error: 'Fail to delete' })
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server start at prot ${PORT}`)
})