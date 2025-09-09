const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// connect
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connect to MongDB')
    })
    .catch(error => {
        console.log('Error when connect to MongDB:', error)
    })

// create schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

// custom schema return value
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// create model
const Person = mongoose.model('Person', personSchema)

// export model
module.exports = Person
