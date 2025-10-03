require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { default: mongoose } = require('mongoose')
const { GraphQLError, graphql } = require('graphql')
const jwt = require('jsonwebtoken')

mongoose.set('strictQuery', false)

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to ', MONGODB_URI)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connect to MongoDB')
  })
  .catch((error) => {
    console.log('error when connect to MongoDB: ', error.message)
  })

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
    user: User!
  }
  
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  
  type Mutation {
    addAuthor(name: String!, born: Int): Author

    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async (root, args) => {
      if (!args.author) {
        return Book.collection.countDocuments()
      }

      return Book.countDocuments({ 'author.name': args.author.name })
    },

    authorCount: async () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      let result = await Book.find({}).populate('author')
      console.log(result)
      if (args.author) {
        result = result.filter((book) => book.author.name === args.author)
      }

      if (args.genre) {
        result = result.filter((book) => book.genres.includes(args.genre))
      }

      return result
    },

    allAuthors: async (root, args) => {
      const authors = await Author.find({})
      const books = await Book.find({})

      const returned = authors.map((author) => {
        return {
          ...author._doc,
          id: author._doc._id,
          bookCount: books.filter(
            (book) => book.author.toString() === author._doc._id.toString()
          ).length,
        }
      })

      return returned
    },
  },

  Mutation: {
    addAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Authenticated fail, please login', {
          extension: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const author = new Author({
        name: args.name,
        born: args.born,
      })

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Add author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }

      return author
    },

    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Authenticated fail, please login', {
          extension: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      let author = await Author.findOne({ name: args.author })
      console.log('author found:', author)

      if (!author) {
        try {
          const newAuthor = new Author({ name: args.author })
          author = await newAuthor.save()
          console.log('new author:', newAuthor)
        } catch (error) {
          console.log(error)
          throw new GraphQLError('Add user failed when adding new book', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          })
        }
      }

      const newBook = new Book({
        ...args,
        author: author._id,
      })

      try {
        console.log('newBook:', newBook)
        await newBook.save()
      } catch (error) {
        throw new GraphQLError('Add Book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        })
      }

      return Book.findOne({ _id: newBook._id }).populate('author')
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Authenticated fail, please login', {
          extension: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Update author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            error,
          },
        })
      }

      return author
    },

    //createUser(username: String!, favoriteGenre: String!): User
    createUser: async (root, args) => {
      const isExist = await User.findOne({ username: args.username })
      if (isExist) {
        throw new GraphQLError('User already exists', {
          extensions: {
            code: 'USER_BAD_INPUT',
            invalidArgs: args.username,
          },
        })
      }

      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      try {
        await user.save()
      } catch (error) {
        throw new GraphQLError('Create user failed', {
          extension: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      }

      return user
    },

    //login(username: String!, password: String!): Token
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== '123') {
        throw new GraphQLError('wrong credentials', {
          extension: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const payload = { username: user.username, id: user._id }
      const token = jwt.sign(payload, process.env.JWT_SECRET)

      return {
        value: token,
        user: user,
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
