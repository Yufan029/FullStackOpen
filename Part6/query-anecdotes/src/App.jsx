import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, vote } from './requests'
import { useSetNotificationWithTimeout } from './helper'

const App = () => {
  const queryClient = useQueryClient()
  const setNotificationWithTimeout = useSetNotificationWithTimeout()

  const voteMutation = useMutation({
    mutationFn: vote,
    onSuccess: (votedAnecdote) => {
      // re-fetch all anecdotes from server again, will have an extra get request to server
      //queryClient.invalidateQueries({ queryKey: ['anecdotes'] })

      // manually update the anecdotes state, will update the client side state, no extra request send to server
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const newAnecdotes = anecdotes.map(anecdote => anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote)
      queryClient.setQueryData(['anecdotes'], newAnecdotes)
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    setNotificationWithTimeout(`you vote for: '${anecdote.content}', total: ${anecdote.votes + 1} votes`)
  }

  const queryResult = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false
  })

  if (queryResult.isLoading) {
    return <div>Loading...</div>
  } else if (queryResult.isError) {
    console.log(queryResult.error)
    return <div>anecdote service not available due to problems in server: {queryResult.error.message}</div>
  }

  const anecdotes = queryResult.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
