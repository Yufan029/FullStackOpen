import { useReducer, createContext } from 'react'

const NotificationContext = createContext()
const NotificationDispatchContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NOTIFY': {
      return {
        error: action.error,
        message: action.message,
      }
    }
    default: {
      return state
    }
  }
}

const initialNotification = {
  error: false,
  message: null,
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispath] = useReducer(
    notificationReducer,
    initialNotification
  )

  const notificationDispathWithTimeout = (notification, duration = 5000) => {
    notificationDispath({
      type: 'NOTIFY',
      message: notification.message,
      error: notification.error,
    })
    setTimeout(() => {
      notificationDispath({ type: 'NOTIFY', message: null, error: false })
    }, duration)
  }

  return (
    <NotificationContext value={notification}>
      <NotificationDispatchContext value={notificationDispathWithTimeout}>
        {props.children}
      </NotificationDispatchContext>
    </NotificationContext>
  )
}

export { NotificationContext, NotificationDispatchContext }
