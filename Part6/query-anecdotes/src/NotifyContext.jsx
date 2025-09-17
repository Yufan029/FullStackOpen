import { useReducer, createContext } from "react";

const NotifyContext = createContext()

const notifyReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    default:
      return state
  }
}

export default NotifyContext

export const NotifyContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notifyReducer, null)

  const setNotificationWithTimeout = (message, duration = 5) => {
    notificationDispatch({ type: 'SET', payload: message })
    setTimeout(() => {
      notificationDispatch({ type: 'SET', payload: null })
    }, duration * 1000);
  }

  return (
    <NotifyContext.Provider value={[notification, setNotificationWithTimeout]}>
      {props.children}
    </NotifyContext.Provider>
  )
}