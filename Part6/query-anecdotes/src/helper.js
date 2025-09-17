import { useContext } from 'react'
import NotifyContext from './NotifyContext'

export const useNotification = () => {
  const notificationAndDispatch = useContext(NotifyContext)
  return notificationAndDispatch[0]
}

export const useSetNotificationWithTimeout = () => {
  const notificationAndDispatch = useContext(NotifyContext)
  return notificationAndDispatch[1]
}