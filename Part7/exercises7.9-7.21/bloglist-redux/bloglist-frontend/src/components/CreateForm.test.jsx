import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateForm from './CreateForm'

describe('testing create new blog', () => {
  test('new blog create, the handler gets right values', async () => {
    const createhandlerMock = vi.fn()

    render(<CreateForm handleCreate={createhandlerMock} />)

    const user = userEvent.setup()
    const title = screen.getByLabelText('title:')
    const author = screen.getByLabelText('author:')
    const url = screen.getByLabelText('url:')

    await user.type(title, 'BIG TITLE')
    await user.type(author, 'foo bar')
    await user.type(url, 'http://localhost')

    const createButton = screen.getByText('Create')
    await user.click(createButton)
    expect(createhandlerMock.mock.calls).toHaveLength(1)
    console.log(createhandlerMock.mock.calls)
    expect(createhandlerMock.mock.calls[0][0]).toBe('BIG TITLE')
    expect(createhandlerMock.mock.calls[0][1]).toBe('foo bar')
    expect(createhandlerMock.mock.calls[0][2]).toBe('http://localhost')
  })
})