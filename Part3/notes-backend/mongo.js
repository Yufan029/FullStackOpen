require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)

// schema concept are not in the database, document databases are schemaless,
// mean doesn't care about the structure of data in database.
// This schema is only application level - define the shape of the collection in document database.
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

// and create the matching model, like the factory object to create new note
// like constructor function
const Note = mongoose.model('Note', noteSchema)


// so the note has all the functionality inherit from model Note (prototype inherit)
// and can use the method provided by the contructor model(Note), like save() below
// const note = new Note({
//     content: 'CSS is hard',
//     important: true,
// })

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })


Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})