import { createContext, useReducer } from 'react'
import blogService from '../services/blogs'

const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': {
      console.log('set user', action.payload)
      return action.payload
    }
    case 'GET_USER': {
      const userInLocal = window.localStorage.getItem('loggedBlogappUser')
      if (userInLocal) {
        const user = JSON.parse(userInLocal)
        blogService.setToken(user.token)
        return user
      }
      return null
    }
    case 'LOGOUT': {
      window.localStorage.removeItem('loggedBlogappUser')
      return null
    }
    default: {
      return state
    }
  }
}

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext value={[user, userDispatch]}>{props.children}</UserContext>
  )
}

export default UserContext
