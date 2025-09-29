import { useState, useImperativeHandle } from 'react'
import { Button } from '@mui/material'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const showForm = {
    display: visible ? '' : 'none',
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <>
      <div style={{ display: visible ? 'none' : '' }}>
        <Button
          style={{ marginBottom: '10px' }}
          variant='contained'
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showForm}>
        {props.children}
        <Button
          style={{
            marginBottom: '15px',
            marginTop: '5px',
          }}
          variant='outlined'
          size='small'
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </>
  )
}

export default Togglable
