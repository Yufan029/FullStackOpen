import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { increaseLikes, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, loginUser }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const buttonStyle = {
    display: loginUser.username === blog.user.username ? '' : 'none',
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 5,
  }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const increaseLike = () => {
    const updatedBlog = {
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    dispatch(increaseLikes(updatedBlog))
  }

  const handleDelete = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    }

    dispatch(deleteBlog(blog))
  }

  return (
    <div>
      <div style={blogStyle} data-testid='blog-item'>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisible}>{visible ? 'hide' : 'view'}</button>
        </div>
        <div style={{ display: visible ? '' : 'none' }}>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={increaseLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <button style={buttonStyle} onClick={() => handleDelete(blog)}>
            remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog
