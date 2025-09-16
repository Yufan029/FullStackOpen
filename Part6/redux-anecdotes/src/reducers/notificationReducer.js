import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotifyMessage(state, action) {
      return action.payload
    }
  }
})

export const { setNotifyMessage } = notificationSlice.actions
export default notificationSlice.reducer