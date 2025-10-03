import { useState } from 'react'
import { ALL_PERSONS } from './queries'
import { useApolloClient, useQuery } from '@apollo/client/react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notify from './components/Notify'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  if (result.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('phonenumbers-user-token')
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>log out</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  )
}

export default App
