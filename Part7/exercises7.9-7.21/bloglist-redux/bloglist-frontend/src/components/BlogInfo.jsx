import { useDispatch, useSelector } from 'react-redux'
import { increaseLikes, deleteBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import Comments from './Comments'
import { Typography, Button } from '@mui/material'

const BlogInfo = ({ blogInfo }) => {
  const dispatch = useDispatch()
  const loginUser = useSelector(({ user }) => user)
  const navigate = useNavigate()

  if (!blogInfo) {
    return null
  }

  const buttonStyle = {
    display: loginUser.username === blogInfo.user.username ? '' : 'none',
    borderRadius: 5,
  }

  const increaseLike = () => {
    const updatedBlog = {
      id: blogInfo.id,
      user: blogInfo.user.id,
      likes: blogInfo.likes + 1,
      author: blogInfo.author,
      title: blogInfo.title,
      url: blogInfo.url,
    }

    dispatch(increaseLikes(updatedBlog))
  }

  const handleDelete = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    }

    dispatch(deleteBlog(blog))
    navigate('/')
  }

  return (
    <div style={{ minWidth: '30vw' }}>
      <Typography variant='h2'>{blogInfo.title}</Typography>
      <a href='#'>
        <Typography variant='h5'>{blogInfo.url}</Typography>
      </a>
      <div
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <Typography variant='h5'> likes {blogInfo.likes} </Typography>
        <Button variant='contained' size='small' onClick={increaseLike}>
          like
        </Button>
      </div>
      <Typography variant='h6'>Added by {blogInfo.user.name}</Typography>
      <Button
        style={buttonStyle}
        variant='contained'
        color='warning'
        size='small'
        onClick={() => handleDelete(blogInfo)}
      >
        remove
      </Button>

      <Comments blogId={blogInfo.id} comments={blogInfo.comments} />
    </div>
  )
}

export default BlogInfo
