const NotifyMessage = ({ message }) => {
  if (message === null) {
    return
  }

  return (
    <div className="notify">{message}</div>
  )
}

export default NotifyMessage