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
    name: {
        type: String,
        minLength: 3
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function(v) {
                return /\d{2,3}-\d+/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! Example:040-1234556 or 23-434234`
        },
        required: [true, 'Phone number required']
    }
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
