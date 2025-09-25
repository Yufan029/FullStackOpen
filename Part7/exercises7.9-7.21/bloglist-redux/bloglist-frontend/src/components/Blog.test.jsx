import { render, screen } from '@testing-library/react'
import { beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component tests', () => {
  const updateBlogMock = vi.fn()

  beforeEach(() => {
    const blog = {
      title: 'This is title',
      author: 'Foo Bar',
      url: 'http://localhost',
      likes: 33,
      user: {
        username: 'username',
      }
    }

    const loginUser = {
      usename: 'username',
      name: 'name',
    }

    render(<Blog
      blog={blog}
      loginUser={loginUser}
      updateBlog={updateBlogMock}
    />)
  })

  test('render default, only show title and author', () => {
    const titleAndAuthor = screen.getByText('This is title Foo Bar')
    const url = screen.getByText('http://localhost')
    const likes = screen.getByText('likes 33')

    expect(titleAndAuthor).toBeVisible()
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
  })

  test('View button click reveal the url and likes', async () => {
    const viewButton = screen.getByText('view')
    const user = userEvent.setup()

    const url = screen.getByText('http://localhost')
    const likes = screen.getByText('likes 33')

    expect(viewButton).toBeVisible()
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()

    await user.click(viewButton)

    const hideButton = screen.getByText('hide')
    expect(hideButton).toBeVisible()
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })

  test('like button click twice, likes 35 can be found', async () => {
    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    expect(viewButton).toBeVisible()
    const likesText = screen.getByText('likes 33')
    expect(likesText).not.toBeVisible()

    await user.click(viewButton)

    expect(likesText).toBeVisible()
    const likeButton = screen.getByText('like')
    expect(likeButton).toBeVisible()

    await user.click(likeButton)
    await user.click(likeButton)

    // cannot be checked, since the update happens outside the component
    // const newLikeText = screen.getByText('likes 35')
    // expect(newLikeText).toBeVisible()

    //console.log(updateBlogMock.mock.calls)
    expect(updateBlogMock.mock.calls).toHaveLength(2)
    expect(updateBlogMock.mock.calls[0][0].likes).toBe(34)
  })
})