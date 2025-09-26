import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import Blog from './Blog'
import CreateFormWithToggle from './CreateFormWithToggle'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={() => dispatch(logout())}>log out</button>
      </p>
      <CreateFormWithToggle />
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} loginUser={user} />
      ))}
    </div>
  )
}

export default Blogs
