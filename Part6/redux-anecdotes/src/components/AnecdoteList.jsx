import { useDispatch, useSelector } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'

// presentational component
const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

// container component
const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  })

  return (
    <div>
      {anecdotes && anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote 
          key={anecdote.id} 
          anecdote={anecdote} 
          handleClick={() => dispatch(vote(anecdote.id))} />
      )}
    </div>
  )
}

export default AnecdoteList