import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Notify from './components/Notify'
import Login from './components/Login'
import { useApolloClient } from '@apollo/client/react'
import { useEffect } from 'react'
import Recommend from './components/Recommend'

const App = () => {
  const [message, setMessage] = useState(null)
  const [token, setToken] = useState()
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('library-token'))
    setUser(JSON.parse(localStorage.getItem('library-user')))
  }, [])

  const logout = () => {
    setToken(null)
    setUser(null)
    client.clearStore()
    localStorage.removeItem('library-token')
    localStorage.removeItem('library-user')
    navigate('/')
  }

  const menuStyle = {
    marginRight: 5,
    marginTop: 18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'solid 1px black',
    backgroundColor: '#eee',
    borderRadius: 5,
    height: 25,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
    textDecoration: 'none',
  }

  const setNotifyMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <Notify message={message} />
      <div
        style={{
          display: 'flex',
        }}
      >
        <Link style={menuStyle} to='/'>
          <h3>Authors</h3>
        </Link>
        <Link style={menuStyle} to='/books'>
          <h3>Books</h3>
        </Link>
        {token ? (
          <>
            <Link style={menuStyle} to='/newBook'>
              <h3>Add book</h3>
            </Link>

            <Link style={menuStyle} to='/recommend'>
              <h3>recommend</h3>
            </Link>
            <button
              style={{
                marginTop: 18,
                height: 35,
                paddingLeft: 12,
                paddingRight: 12,
                borderRadius: 5,
                boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                fontWeight: '600',
              }}
              onClick={logout}
            >
              <b>logout</b>
            </button>
          </>
        ) : (
          <Link style={menuStyle} to='/login'>
            <h3>Login</h3>
          </Link>
        )}
      </div>

      <Routes>
        <Route
          path='/'
          element={<Authors setNotifyMessage={setNotifyMessage} />}
        />
        <Route path='/books' element={<Books />} />
        <Route
          path='/newBook'
          element={<NewBook setNotifyMessage={setNotifyMessage} />}
        />
        <Route
          path='/recommend'
          element={<Recommend genre={user ? user.favoriteGenre : null} />}
        />
        <Route
          path='/login'
          element={
            <Login
              setToken={setToken}
              setUser={setUser}
              setNotifyMessage={setNotifyMessage}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
