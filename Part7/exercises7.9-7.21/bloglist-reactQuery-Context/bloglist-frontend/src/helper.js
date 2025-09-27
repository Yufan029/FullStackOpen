import { useContext } from 'react'
import {
  NotificationContext,
  NotificationDispatchContext,
} from './NotificationContext'

export const useNotifyDispatchWithTimeout = () => {
  return useContext(NotificationDispatchContext)
}

export const useNotification = () => {
  return useContext(NotificationContext)
}

export const setMessage = (message, error = false) => {
  return {
    type: 'NOTIFY',
    message: message,
    error: error,
  }
}
