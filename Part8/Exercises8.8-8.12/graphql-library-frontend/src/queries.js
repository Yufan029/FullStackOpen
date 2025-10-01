import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      id
      genres
    }
  }
`

// the first mutation name (updateAuthor) is used in frontend when useMutation(UPDATE_AUTHOR), it's the first reture value in array
// the editAuthor is the API name in backend
// and the contents in {} afterwards, (here 'name', 'born' is the return value properties)
// the bookCount is not in the list, because it's not in the returned updatedAuthor, (check backend code)
export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $birthyear: Int!) {
    editAuthor(name: $name, setBornTo: $birthyear) {
      name
      born
    }
  }
`
