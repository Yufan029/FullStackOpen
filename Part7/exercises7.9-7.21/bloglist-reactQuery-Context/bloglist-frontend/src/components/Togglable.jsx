import { useState, useImperativeHandle } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const showForm = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <>
      <div style={{ display: visible ? 'none' : '' }}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showForm}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )
}

export default Togglable