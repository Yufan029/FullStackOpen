const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

const listWithOneBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
  }
]

const oneNormalBlog = {
  title: 'Go To Skiiiiii',
  author: 'Ada',
  url: 'https://homepages.cwi.nl/',
  likes: 3,
}

const blogMissingLikeProperty = {
  title: 'Missing like property',
  author: 'me',
  url: 'http://localhost'
}

const blogWithoutTitle = {
  author: 'Jo',
  url: 'http://localhost',
  likes: 3
}

const blogWithoutUrl = {
  author: 'Do',
  title: 'Do do do do',
  likes: 5
}

module.exports = {
  blogs,
  listWithOneBlog,
  blogMissingLikeProperty,
  blogWithoutTitle,
  oneNormalBlog,
  blogWithoutUrl
}