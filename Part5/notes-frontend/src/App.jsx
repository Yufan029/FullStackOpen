import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

function App() {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await noteService.getAll()
      setNotes(notes)
    }

    fetchNotes()
  }, [])

  useEffect(() => {
    const loggedNoteappUser = window.localStorage.getItem('loggedNoteappUser')
    if (loggedNoteappUser) {
      const user = JSON.parse(loggedNoteappUser)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility()
    const returnedNote = await noteService.create(noteObject)
    setNotes(notes.concat(returnedNote))
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)

    const changedNote = {
      ...note,
      important: !note.important
    }

    noteService
      .update(id, changedNote)
      .then(returnedNote => setNotes(notes.map(note => note.id === id ? returnedNote : note)))
      .catch(() => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  )

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged</p>
          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <Footer />
    </div>
  )
}

export default App
