import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { error: false, message: null },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})

export const { setNotification } = notificationSlice.actions

export const setNotificationWithTimeout = (notification, duration = 5000) => {
  return async (dispath) => {
    dispath(setNotification(notification))
    setTimeout(() => {
      dispath(setNotification(null))
    }, duration)
  }
}

export default notificationSlice.reducer
