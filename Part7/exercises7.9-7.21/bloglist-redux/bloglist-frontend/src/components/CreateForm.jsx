import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'
import { Box, TextField, Button, Typography } from '@mui/material'

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
      <Typography variant='h5'>Create new</Typography>
      <Box
        component='form'
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            label='title'
            variant='outlined'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            label='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <TextField
            label='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button type='submit' variant='contained' color='primary' size='small'>
          Create
        </Button>
      </Box>
    </div>
  )
}
export default CreateForm
