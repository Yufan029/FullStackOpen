import { useDispatch } from "react-redux"
import { createNew } from '../reducers/anecdoteReducer'
import { setNotifyMessage } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createNew(content))
    event.target.anecdote.value = ''

    dispatch(setNotifyMessage(`you created the new anecdote: '${content}'`))
    setTimeout(() => {
      dispatch(setNotifyMessage(null))
    }, 5000);
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input name="anecdote" /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm