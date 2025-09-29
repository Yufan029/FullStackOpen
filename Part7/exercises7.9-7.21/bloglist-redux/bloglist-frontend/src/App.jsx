import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import NotifyMessage from './components/NotifyMessage'
import Blogs from './components/Blogs'
import { Routes, Route, useMatch } from 'react-router-dom'
import './App.css'
import Users from './components/Users'
import usersService from './services/users'
import UserInfo from './components/UserInfo'
import Menu from './components/Menu'
import BlogInfo from './components/BlogInfo'
import { Box, Typography } from '@mui/material'

const App = () => {
  const [allUsers, setAllUsers] = useState()
  const dispatch = useDispatch()
  const loginUser = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const users = await usersService.getUsers()
        if (Array.isArray(users)) {
          setAllUsers(users)
        } else {
          console.log('Expect array but got:', users)
        }
      } catch (error) {
        console.log('Fail to fetch all users', error)
      }
    }

    dispatch(getAllBlogs())
    dispatch(setUser())
    fetchAllUsers()
  }, [])

  const userMatch = useMatch('/users/:id')
  const userInfo = userMatch
    ? allUsers.find((user) => user.id.toString() === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blogInfo =
    blogMatch && blogs
      ? blogs.find((blog) => blog.id.toString() === blogMatch.params.id)
      : null

  return (
    <Box
      sx={{
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <NotifyMessage />
      <Typography variant='h2'>Blog app</Typography>
      {loginUser && <Menu />}
      {loginUser ? (
        <Routes>
          <Route path='/' element={<Blogs />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/:id' element={<BlogInfo blogInfo={blogInfo} />} />
          <Route path='/users' element={<Users users={allUsers} />} />
          <Route path='/users/:id' element={<UserInfo userInfo={userInfo} />} />
        </Routes>
      ) : (
        <LoginForm />
      )}
    </Box>
  )
}

export default App
