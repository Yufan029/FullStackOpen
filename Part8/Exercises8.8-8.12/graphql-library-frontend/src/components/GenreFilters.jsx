import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'

const GenreFilters = ({ setFilter }) => {
  const queryAllBooks = useQuery(ALL_BOOKS)

  if (queryAllBooks.loading) {
    return <div>loading...</div>
  }

  const books = queryAllBooks.data.allBooks
  const allGenres = books.reduce((acc, cur) => {
    cur.genres.map((genre) => {
      if (!acc.includes(genre)) {
        acc.push(genre)
      }
    })

    return acc
  }, [])

  console.log('all genres', allGenres)

  return (
    <div>
      {allGenres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  )
}

export default GenreFilters
