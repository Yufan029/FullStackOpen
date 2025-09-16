import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import App from './App'
import { Provider } from 'react-redux'
//import { createStore, combineReducers } from 'redux'


const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer
// })

// const store = createStore(reducer)

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)