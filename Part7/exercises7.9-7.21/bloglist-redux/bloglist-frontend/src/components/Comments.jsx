import { TextField, Typography, Button, Box } from '@mui/material'
import commentService from '../services/comments'

const Comments = ({ blogId, comments }) => {
  console.log(comments)
  const handleSubmit = async (event) => {
    console.log(event.target)
    const content = event.target.comment.value
    await commentService.create(blogId, content)
    event.target.comment.value = ''
  }

  return (
    <div
      style={{
        marginTop: '2rem',
        marginBottom: '1rem',
      }}
    >
      <Typography variant='h5'>Comments</Typography>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '.5rem',
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          id='outlined-basic'
          name='comment'
          label='comments...'
          variant='outlined'
        />
        <Button type='submit' variant='contained' size='small'>
          add comment
        </Button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Typography variant='h6'>{comment.content}</Typography>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
