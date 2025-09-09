const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://zhangyufan029_db_user:${password}@cluster0.kccnim3.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

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