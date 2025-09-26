import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotificationWithTimeout } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser() {
      const userInLocal = window.localStorage.getItem('loggedBlogappUser')
      if (userInLocal) {
        const user = JSON.parse(userInLocal)
        blogService.setToken(user.token)
        return user
      }

      return null
    },
    loginUser(state, action) {
      return action.payload
    },
    logout() {
      window.localStorage.removeItem('loggedBlogappUser')
      return null
    },
  },
})

export const { setUser, loginUser, logout } = userSlice.actions

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(loginUser(user))
    } catch {
      dispatch(
        setNotificationWithTimeout({
          error: true,
          message: 'wrong credentials',
        })
      )
    }
  }
}

export default userSlice.reducer
