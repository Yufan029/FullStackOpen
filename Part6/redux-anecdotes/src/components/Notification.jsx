import { useSelector } from "react-redux"

const Notification = () => {
  const notificationMessage = useSelector(state => {
    console.log('↓↓↓↓↓↓↓↓↓↓↓↓↓*** state ***↓↓↓↓↓↓↓↓↓↓↓↓↓↓', state)
    return state.notify
  })

  if (notificationMessage == null) {
    return 
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <div style={style}>
      {notificationMessage}
    </div>
  )
}

export default Notification