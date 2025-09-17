import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNew } from "../requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const createNewMutation = useMutation({
    mutationFn: createNew,
    onSuccess: () => {
      // re-fetch all anecdotes from server again
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
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
