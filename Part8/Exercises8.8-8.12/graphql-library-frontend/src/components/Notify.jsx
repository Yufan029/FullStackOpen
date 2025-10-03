const Notify = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <div
      style={{
        color: 'red',
        border: '5px solid red',
        padding: 5,
        maxWidth: '400px',
      }}
    >
      {message}
    </div>
  )
}

export default Notify
