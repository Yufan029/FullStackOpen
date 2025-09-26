import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import NotifyMessage from './components/NotifyMessage'
import Blogs from './components/Blogs'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    dispatch(getAllBlogs())
    dispatch(setUser())
  }, [])

  return (
    <>
      <NotifyMessage />
      {user ? <Blogs /> : <LoginForm />}
    </>
  )
}

export default App
