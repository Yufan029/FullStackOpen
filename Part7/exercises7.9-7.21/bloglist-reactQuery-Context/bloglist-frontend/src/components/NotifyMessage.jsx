import { useNotification } from '../helper'

const NotifyMessage = () => {
  const notification = useNotification()
  console.log(notification)

  if (notification.message === null) {
    return
  }

  return (
    <div className={notification.error ? 'error' : 'notify'}>
      {notification.message}
    </div>
  )
}

export default NotifyMessage
