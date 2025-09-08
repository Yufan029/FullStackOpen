import { useState, useEffect } from 'react'
import AddNewPerson from './componenets/AddNewPerson'
import Search from './componenets/Search'
import Display from './componenets/Display'
import personService from './services/personService'
import Notification from './componenets/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] =useState('')
  const [searchName, setSearchName] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
      .catch(error => {
        alert(error)
      })
  }, [])

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }

  const handleSubmit = (event) => {
    // no reload the page anymore
    event.preventDefault()

    const exist = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (exist) {
      if (window.confirm(`${exist.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
          ...exist,
          number: phoneNumber
        }

        personService
          .update(exist.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === exist.id ? returnedPerson : person))
          })
          .catch(error => {
            console.log(error)
            setErrorFlagWithTimeout()
            notifyWithTimeout(`Information of ${exist.name} has already been removed from server`)

            // refresh list
            personService.getAll().then(persons => setPersons(persons))
          })
        
        notifyWithTimeout(`Updated ${exist.name}'s phone number success`)
        setNewName('')
        setPhoneNumber('')
      }

      return
    }
    
    const newPerson = {
      name: newName,
      number: phoneNumber,
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setPhoneNumber('')
        notifyWithTimeout(`Added ${returnedPerson.name}`)
        console.log(persons)
      })
      .catch(error => {
        alert(error)
      })
  }

  const notifyWithTimeout = (message) => {
    setNotificationMsg(message)
    setTimeout(() => {
      setNotificationMsg(null)
    }, 3000)
  }

  const setErrorFlagWithTimeout = () => {
    setHasError(true)
    setTimeout(() => {
      setHasError(false)
    }, 3000)
  }

  const handleDelete = (id, name) => {
    personService
      .getById(id)
      .then(deletedPerson => {
        if (window.confirm(`Delete ${deletedPerson.name}`)) {
          personService
            .deleteById(id)
            .then(deletedPerson => {
              setPersons(persons.filter(person => person.id !== deletedPerson.id))
              notifyWithTimeout(`Deleted ${deletedPerson.name}`)
            })
        }
      })
      .catch(error => {
        console.log(error.message)
        setErrorFlagWithTimeout()
        notifyWithTimeout(`Information of ${name} has already been removed from server`)

        // reset persons to refresh list
        personService.getAll().then(persons => setPersons(persons))
      })
  }

  const personToShow = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <Notification message={notificationMsg} hasError={hasError} />
      <Search title='Phonebook' text='filter shown with' value={searchName} onChange={handleSearchNameChange} />
      <AddNewPerson 
        title='Add a new'
        newName={newName}
        phoneNumber={phoneNumber}
        handleInputChange={handleInputChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
        handleSubmit={handleSubmit}
      />
      <Display title='Number' persons={personToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App