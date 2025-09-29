import { useSelector } from 'react-redux'
import Blog from './Blog'
import CreateFormWithToggle from './CreateFormWithToggle'
import { Box } from '@mui/material'

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => blogs)

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <Box
      sx={{
        width: '50vw',
      }}
    >
      <CreateFormWithToggle />
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </Box>
  )
}

export default Blogs
