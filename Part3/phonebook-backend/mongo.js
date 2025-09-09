const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('password, name and number should be passed as parameters')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://zhangyufan029_db_user:${password}@cluster0.kccnim3.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

// Model is singular (Person), in mongoose the collection name is plural (people)
const Person = mongoose.model('Person', personSchema)

if (name && number) {
    const person = new Person({ name, number })
    person
        .save()
        .then(result => {
            console.log(result)
            console.log(`added ${result.name} number ${result.number} to phonebook`)
            mongoose.connection.close()
        })
} else {
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
}