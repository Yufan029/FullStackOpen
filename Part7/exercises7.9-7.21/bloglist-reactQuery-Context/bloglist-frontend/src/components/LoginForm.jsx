import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import {
  useUserDispatcher,
  useNotifyDispatchWithTimeout,
  setMessage,
} from '../helper'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const userDispatcher = useUserDispatcher()
  const notifyWithTimeout = useNotifyDispatchWithTimeout()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatcher({ type: 'SET_USER', payload: user })
    } catch {
      notifyWithTimeout(setMessage('wrong credentials', true))
    }
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
