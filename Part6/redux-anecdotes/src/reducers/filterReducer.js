import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter(state, action) {
      // exception, since the state is '' (primitive value - string, number, boolean, null, undefined), cannot be proxy by immer, 
      // only array/object can be proxy by immer
      //console.log('Current state:????????', current(state));
      //console.log('Current state =======>', state);
      return action.payload
    }
  }
})

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'FILTER_CHANGE':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const filterChange = (filter) => {
//   return {
//     type: 'FILTER_CHANGE',
//     payload: filter
//   }
// }

// export default filterReducer