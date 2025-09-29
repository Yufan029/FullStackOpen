import { useSelector } from 'react-redux'
import Blog from './Blog'
import CreateFormWithToggle from './CreateFormWithToggle'

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => blogs)

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <CreateFormWithToggle />
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
