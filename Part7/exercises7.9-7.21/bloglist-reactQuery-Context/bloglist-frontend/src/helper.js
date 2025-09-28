import { useContext } from 'react'
import {
  NotificationContext,
  NotificationDispatchContext,
} from './contexts/NotificationContext'

import UserContext from './contexts/UserContext'

export const useNotifyDispatchWithTimeout = () => {
  return useContext(NotificationDispatchContext)
}

export const useNotification = () => {
  return useContext(NotificationContext)
}

export const useUser = () => {
  const [user, _] = useContext(UserContext)
  return user
}

export const useUserDispatcher = () => {
  const [_, dispatcher] = useContext(UserContext)
  return dispatcher
}

export const setMessage = (message, error = false) => {
  return {
    type: 'NOTIFY',
    message: message,
    error: error,
  }
}
