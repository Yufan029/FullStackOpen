import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotifyMessage(state, action) {
      //console.log('↓↓↓↓↓↓↓↓↓↓↓↓↓*** state ***↓↓↓↓↓↓↓↓↓↓↓↓↓↓', state)
      return action.payload
    }
  }
})

export const { setNotifyMessage } = notificationSlice.actions

export const setNotification = (content, duration) => {
  return async dispatch => {
    dispatch(setNotifyMessage(content))
    setTimeout(() => {
      dispatch(setNotifyMessage(null))
    }, duration * 1000);
  }
}

export default notificationSlice.reducer