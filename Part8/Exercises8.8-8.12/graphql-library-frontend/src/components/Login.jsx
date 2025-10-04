import { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/client/react'
import { CURRENT_USER, LOGIN } from '../queries'
import { useNavigate } from 'react-router-dom'

const Login = ({ setToken, setNotifyMessage }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const Navigate = useNavigate()
  const client = useApolloClient()

  const [login, result] = useMutation(LOGIN, {
    refetchQueries: [{ query: CURRENT_USER }],
    awaitRefetchQueries: true,
    onError: (error) => {
      console.log(Object.keys(error))
      console.log(error.errors[0].message)
      setNotifyMessage(error.errors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      console.log('token --> ', result.data.login.value)
      localStorage.setItem('library-token', token)
      client.resetStore()
      setToken(token)
      setName('')
      setPassword('')
      Navigate('/')
    }
  }, [result.data])

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ variables: { name, password } })
  }

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <label>
          name
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login
