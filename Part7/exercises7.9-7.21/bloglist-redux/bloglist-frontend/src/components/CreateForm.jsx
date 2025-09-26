import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'

const CreateForm = ({ toggleRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    toggleRef.current.toggleVisibility()
    dispatch(createNewBlog(title, author, url))
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title:
            <input
              type='text'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type='text'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type='text'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}
export default CreateForm
