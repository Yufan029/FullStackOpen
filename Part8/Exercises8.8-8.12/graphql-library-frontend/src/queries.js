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
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
        born
        id
      }
      published
      id
      genres
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
      author {
        name
        born
        id
      }
      published
      id
      genres
    }
  }
`

// the first mutation name (updateAuthor) is used in frontend when useMutation(UPDATE_AUTHOR) is called
// , it's the first retured values in array.
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

// backend ==> login(username: String!, password: String!): Token
export const LOGIN = gql`
  mutation login($name: String!, $password: String!) {
    login(username: $name, password: $password) {
      value
    }
  }
`

export const CURRENT_USER = gql`
  query currentUser {
    me {
      username
      favoriteGenre
      id
    }
  }
`
