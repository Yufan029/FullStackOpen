import { useSelector } from 'react-redux'

const NotifyMessage = () => {
  const notification = useSelector(({ notification }) => notification)

  if (!notification || notification.message === null) {
    return
  }

  return (
    <div className={notification.error ? 'error' : 'notify'}>
      {notification.message}
    </div>
  )
}

export default NotifyMessage
