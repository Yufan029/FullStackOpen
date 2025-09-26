import { useRef } from 'react'
import Togglable from './Togglable'
import CreateForm from './CreateForm'

const CreateFormWithToggle = () => {
  const toggleRef = useRef()

  return (
    <Togglable buttonLabel='create new blog' ref={toggleRef}>
      <CreateForm toggleRef={toggleRef} />
    </Togglable>
  )
}

export default CreateFormWithToggle
