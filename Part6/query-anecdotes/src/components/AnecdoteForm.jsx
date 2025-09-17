import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNew } from "../requests"
import { useSetNotificationWithTimeout } from "../helper"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const setNotificationWithTimeout = useSetNotificationWithTimeout()

  const createNewMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      // re-fetch all anecdotes from server again
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      console.log('*********', newAnecdote)
      setNotificationWithTimeout(`you create new anecdote: ${newAnecdote.content}`)
    },
    onError: (error) => {
      console.log(error.response.data.error)
      setNotificationWithTimeout(error.response.data.error, 7)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createNewMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
