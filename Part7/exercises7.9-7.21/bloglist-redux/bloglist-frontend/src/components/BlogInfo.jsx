import { useDispatch, useSelector } from 'react-redux'
import { increaseLikes, deleteBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import Comments from './Comments'

const BlogInfo = ({ blogInfo }) => {
  const dispatch = useDispatch()
  const loginUser = useSelector(({ user }) => user)
  const navigate = useNavigate()

  if (!blogInfo) {
    return null
  }

  const buttonStyle = {
    display: loginUser.username === blogInfo.user.username ? '' : 'none',
    backgroundColor: 'blue',
    color: 'white',
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
    <div>
      <h2>{blogInfo.title}</h2>
      <a href='#'>{blogInfo.url}</a>
      <div>
        likes {blogInfo.likes}
        <button onClick={increaseLike}>like</button>
      </div>
      <div>added {blogInfo.user.name}</div>
      <button style={buttonStyle} onClick={() => handleDelete(blogInfo)}>
        remove
      </button>

      <Comments blogId={blogInfo.id} comments={blogInfo.comments} />
    </div>
  )
}

export default BlogInfo
