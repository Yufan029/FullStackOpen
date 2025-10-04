import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'
import BooksTable from './BooksTable'

const Recommend = ({ user }) => {
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: user.favoriteGenre,
    },
  })

  if (result.loading) {
    return <div>Loading...</div>
  } else if (result.error || !user) {
    return null
  }

  const booksToShow = result.data?.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Book in yhour favorite genre <b>{user.favoriteGenre}</b>
      </p>
      <BooksTable books={booksToShow} />
    </div>
  )
}

export default Recommend
