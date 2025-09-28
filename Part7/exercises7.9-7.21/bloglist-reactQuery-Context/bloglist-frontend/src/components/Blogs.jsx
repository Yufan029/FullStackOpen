import CreateFormWithToggle from './CreateFormWithToggle'
import { useUser, useUserDispatcher } from '../helper'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from './Blog'

const Blogs = () => {
  const user = useUser()
  const userDispatcher = useUserDispatcher()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => await blogService.getAll(),
    refetchOnWindowFocus: true,
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  } else if (result.error) {
    return (
      <div>
        blog service not available due to problems in server:{' '}
        {result.error.message}
      </div>
    )
  }

  const blogs = result.data

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={() => userDispatcher({ type: 'LOGOUT' })}>
          log out
        </button>
      </p>
      <CreateFormWithToggle />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

export default Blogs
