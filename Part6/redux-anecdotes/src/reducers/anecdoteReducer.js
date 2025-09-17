import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAction(state, action) {
      console.log('vote action ==============>', action)
      console.log('vote state ===============>', current(state))
      const updatedAnecdote = action.payload
      return state.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
    },
    append(state, action) {
      state.push(action.payload)
      console.log('createNew action *************************', action)
      console.log('createNew state  *************************', current(state))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAction, append, setAnecdotes } = anecdoteSlice.actions

// redux thunk - return async function
export const initilizeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNew = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(append(newAnecdote))
  }
}

export const vote = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVote(id)
    dispatch(voteAction(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer




///////////////////////////////////////////
//         below is the old way    
///////////////////////////////////////////

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

//const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

//const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch (action.type) {
//     case 'VOTE': {
//       const id = action.payload.id
//       const itemToChange = state.find(anecdote => anecdote.id === id)
//       const updatedItem = {
//         ...itemToChange,
//         votes: Number(itemToChange.votes) + 1
//       }

//       return state.map(anecdote => anecdote.id === id ? updatedItem : anecdote)
//     }
//     case 'ADD': {
//       return state.concat({
//         content: action.payload.content,
//         id: getId(),
//         votes: 0
//       })
//     }
//     default:
//       return state
//   }
// }

// // action creator
// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }

// export const add = (content) => {
//   return {
//     type: 'ADD',
//     payload: { content }
//   }
// }

// export default reducer