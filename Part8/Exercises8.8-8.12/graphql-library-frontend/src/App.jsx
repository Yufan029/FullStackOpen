import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Routes } from 'react-router-dom'
import Notify from './components/Notify'

const App = () => {
  const [message, setMessage] = useState(null)
  const padding = {
    padding: 5,
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
        <Link style={padding} to='/'>
          <h3>Authors</h3>
        </Link>
        <Link style={padding} to='/books'>
          <h3>Books</h3>
        </Link>
        <Link style={padding} to='/newBook'>
          <h3>Add book</h3>
        </Link>
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
      </Routes>
    </div>
  )
}

export default App
