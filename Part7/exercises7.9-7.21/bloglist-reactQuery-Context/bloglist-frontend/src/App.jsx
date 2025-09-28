import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import NotifyMessage from './components/NotifyMessage'
import { useUser, useUserDispatcher } from './helper'
import Blogs from './components/Blogs'
import './App.css'

const App = () => {
  const userDispatcher = useUserDispatcher()
  const user = useUser()

  useEffect(() => {
    userDispatcher({ type: 'GET_USER' })
  }, [])

  return (
    <>
      <NotifyMessage />
      {user ? <Blogs /> : <LoginForm />}
    </>
  )
}

export default App
