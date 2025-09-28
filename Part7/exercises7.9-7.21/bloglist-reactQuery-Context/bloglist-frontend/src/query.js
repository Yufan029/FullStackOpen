import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from './services/blogs'
import { useNotifyDispatchWithTimeout, setMessage } from './helper'

export const useCreateBlogMutation = () => {
  const queryClient = useQueryClient()
  const notifyWithTimeout = useNotifyDispatchWithTimeout()

  return useMutation({
    mutationFn: async ({ title, author, url }) => {
      return await blogService.create({ title, author, url })
    },
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      notifyWithTimeout(
        setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      )
    },
    onError: (error) => {
      notifyWithTimeout(setMessage(error.response.data.error, true))
    },
  })
}

export const useUpdateMutation = () => {
  const queryClient = useQueryClient()
  const notifyWithTimeout = useNotifyDispatchWithTimeout()

  return useMutation({
    mutationFn: async (blogForUpdate) => {
      return await blogService.update(blogForUpdate)
    },
    onSuccess: (updatedBlog) => {
      console.log('updated blog:', updatedBlog)
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => notifyWithTimeout(setMessage(error.message, true)),
  })
}

export const useDeleteMutatoin = () => {
  const queryClient = useQueryClient()
  const notifyWithTimeout = useNotifyDispatchWithTimeout()

  return useMutation({
    mutationFn: async (blog) => {
      await blogService.deleteById(blog.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      notifyWithTimeout(setMessage(error.message, true))
    },
  })
}
