const BooksTable = ({ books }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
          <th>genres</th>
        </tr>
        {books.map((book) => (
          <tr key={book.title}>
            <td>{book.title}</td>
            <td>{book.author.name}</td>
            <td>{book.published}</td>
            <td>{book.genres.join(' | ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BooksTable
