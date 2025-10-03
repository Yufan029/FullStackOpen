import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client/react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const AuthorUpdate = ({ authors, setNotifyMessage }) => {
  const [birthyear, setBirthyear] = useState('')

  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setNotifyMessage(error.errors[0].message)
    },
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('author not found')
      setNotifyMessage('author not found')
    }
  }, [result.data])

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(e.target.selectedAuthor.value)

    updateAuthor({
      variables: {
        name: e.target.selectedAuthor.value,
        birthyear: Number(birthyear),
      },
    })

    setBirthyear('')
  }

  return (
    <div>
      <h4>Set birthyear</h4>
      <form onSubmit={handleSubmit}>
        <label>
          author
          <select name='selectedAuthor'>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          born
          <input
            type='number'
            value={birthyear}
            onChange={(e) => setBirthyear(e.target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorUpdate
