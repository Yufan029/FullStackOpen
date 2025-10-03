import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../queries'
import { useNavigate } from 'react-router-dom'

const Login = ({ setToken, setUser, setNotifyMessage }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const Navigate = useNavigate()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(Object.keys(error))
      console.log(error.errors[0].message)
      setNotifyMessage(error.errors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      console.log('token --> ', result.data)
      localStorage.setItem('library-token', token)
      localStorage.setItem(
        'library-user',
        JSON.stringify(result.data.login.user)
      )
      setToken(token)
      setUser(result.data.login.user)

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
