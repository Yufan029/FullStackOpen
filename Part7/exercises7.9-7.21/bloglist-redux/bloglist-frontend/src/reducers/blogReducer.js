import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotificationWithTimeout } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = state.find((blog) => blog.id === action.payload.id)
      if (updatedBlog) {
        updatedBlog.likes++
      }
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions

export const getAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    console.log(blogs)
    dispatch(setBlogs(blogs))
  }
}

export const createNewBlog = (title, author, url) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create({ title, author, url })
      dispatch(appendBlog(createdBlog))
      dispatch(
        setNotificationWithTimeout({
          message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        })
      )
    } catch {
      dispatch(
        setNotificationWithTimeout({ error: true, message: 'create fail' })
      )
    }
  }
}

export const increaseLikes = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog)
      dispatch(updateBlog(updatedBlog))
    } catch (error) {
      dispatch(
        setNotificationWithTimeout({ error: true, message: error.message })
      )
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteById(blog.id)
      dispatch(removeBlog(blog))
    } catch (error) {
      dispatch(
        setNotificationWithTimeout({ error: true, message: error.message })
      )
    }
  }
}

export default blogSlice.reducer
