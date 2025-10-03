import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'
import GenreFilters from './GenreFilters'
import { useState } from 'react'
import BooksTable from './BooksTable'

const Books = () => {
  const [filter, setFilter] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: filter,
    },
  })

  if (result.loading) {
    return <div>Loading...</div>
  }

  console.log(result.error)
  let books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <BooksTable books={books} />
      <GenreFilters setFilter={setFilter} />
    </div>
  )
}

export default Books
