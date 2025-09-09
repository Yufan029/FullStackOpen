const express = require('express')
const morgan = require('morgan')

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

morgan.token('content', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/info', (request, response) => {
    response.send(`
        <div>Phonebook has info for ${persons.length} people</div>
        <p>${new Date()}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    console.log('person: ', person)
    if (!person) {
        return response.status(400).send('<p>No content</p>')
    }
    
    response.send(`<div>Person with id: ${id}, 
        name is: ${person.name}, number is: ${person.number}`);
})

const generateId = () => {
    return Math.floor(Math.random() * 10000) + 5
}

app.post('/api/persons', (request, response) => {
    const {name, number} = request.body

    if (!name || !number) {
        return response.status(400).json({error: 'Name and number need to provid'})
    }

    const exist = persons.filter(p => p.name.toLowerCase() === name.toLowerCase())
    if (exist.length !== 0) {
        return response.status(400).json({error: 'Name must be unique'})
    }

    const person = {
        id: String(generateId()),
        name,
        number,
    }

    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id === id)

    if (!person) {
        return response.status(400).json({error: 'No content'})
    }

    persons = persons.filter(p => p.id !== id)
    response.send('<p>delete success</p>')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server start at prot ${PORT}`)
})