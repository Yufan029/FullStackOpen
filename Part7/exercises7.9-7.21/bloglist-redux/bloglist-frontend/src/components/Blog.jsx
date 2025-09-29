import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: '1rem',
    borderRadius: '5px',
  }

  return (
    <div>
      <div style={blogStyle} data-testid='blog-item'>
        <Link to={`/blogs/${blog.id}`}>
          <Typography variant='h5'>{blog.title}</Typography>
        </Link>
      </div>
    </div>
  )
}

export default Blog
