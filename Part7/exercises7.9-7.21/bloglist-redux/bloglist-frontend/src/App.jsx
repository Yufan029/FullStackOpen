import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Error from './components/Error'
import NotifyMessage from './components/NotifyMessage'
import './App.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notifyMessage, setNotifyMessage] = useState(null)
  const [user, setUser] = useState(null)
  const toggleRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const userInLocal = window.localStorage.getItem('loggedBlogappUser')
    if (userInLocal) {
      const user = JSON.parse(userInLocal)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleCreate = async (title, author, url) => {
    try {
      toggleRef.current.toggleVisibility()
      const createdBlog = await blogService.create({ title, author, url })
      setNotifyMessage(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`
      )
      setTimeout(() => {
        setNotifyMessage(null)
      }, 5000)

      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch {
      setErrorMessage('create fail')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUpdate = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog)
      console.log(updatedBlog)
      setBlogs(await blogService.getAll())
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    }

    try {
      const result = await blogService.deleteById(blog.id)
      console.log(result)
      setBlogs(await blogService.getAll())
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createForm = () => {
    return (
      <Togglable buttonLabel='create new blog' ref={toggleRef}>
        <CreateForm handleCreate={handleCreate} />
      </Togglable>
    )
  }

  return (
    <>
      <Error message={errorMessage} />
      <NotifyMessage message={notifyMessage} />

      {!user && <LoginForm handleLogin={handleLogin} />}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>log out</button>
          </p>
          {createForm()}
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={handleUpdate}
                deleteBlog={handleDelete}
                loginUser={user}
              />
            ))}
        </div>
      )}
    </>
  )
}

export default App
