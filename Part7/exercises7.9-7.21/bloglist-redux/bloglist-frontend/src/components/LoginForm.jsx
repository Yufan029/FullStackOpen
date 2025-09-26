import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    //handleLogin(username, password)
    dispatch(login(username, password))

    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h1>log in to application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default LoginForm
