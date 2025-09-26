import { createSlice, current } from '@reduxjs/toolkit'
import noteService from '../services/notes'

// const initialState = [
//   {
//     content: 'reducer defines how redux store works',
//     important: true,
//     id: 1
//   },
//   {
//     content: 'state of store can contain any data',
//     important: false,
//     id: 2
//   }
// ]

// const generateId = () => {
//   Number((Math.random() * 1000000).toFixed(0))
// }

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find((n) => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      }

      console.log(current(state))
      return state.map((note) => (note.id === id ? changedNote : note))
    },
    appendNote(state, action) {
      // since it uses immr to change the state directly, no need to return
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    },
  },
})

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export default noteSlice.reducer

// const noteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'NEW_NOTE':
//       return [...state, action.payload]
//     case 'TOGGLE_IMPORTANCE': {
//       const id = action.payload.id
//       const noteToChange = state.find(note => note.id === id)
//       const changedNote = {
//         ...noteToChange,
//         important: !noteToChange.important
//       }

//       return state.map(note => note.id === id ? changedNote : note)
//     }

//     default:
//       return state
//   }
// }

// export const createNote = (content) => {
//   return {
//     type: 'NEW_NOTE',
//     payload: {
//       content,
//       important: false,
//       id: generateId()
//     }
//   }
// }

// export const toggleImportanceOf = (id) => {
//   return {
//     type: 'TOGGLE_IMPORTANCE',
//     payload: { id }
//   }
// }

//export default noteReducer
