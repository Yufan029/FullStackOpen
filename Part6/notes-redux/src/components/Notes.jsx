import { useDispatch, useSelector } from "react-redux"
import { toggleImportanceOf } from "../reducers/noteReducer"

// presentational componenet - not knowing what the handler it gets will do.
const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content} <strong>{note.important ? 'important' : ''}</strong>
    </li>
  )
}

// container component - define the event handler for presentational component
const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes
    }

    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })

  return (
    <ul>
      {notes.map(note=>
        <Note 
          key={note.id} 
          note={note} 
          handleClick={() => dispatch(toggleImportanceOf(note.id))} 
        />
      )}
    </ul>
  )
}

export default Notes