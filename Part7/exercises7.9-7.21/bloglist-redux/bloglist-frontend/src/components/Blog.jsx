import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, loginUser }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom:5
  }

  const buttonStyle = {
    display: loginUser.username === blog.user.username ? '' : 'none',
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 5
  }

  const toggleVisible =  () => {
    setVisible(!visible)
  }

  const increaseLike = () => {
    const updatedBlog = {
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    updateBlog(updatedBlog)
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
          <button style={buttonStyle} onClick={() => deleteBlog(blog)}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog