const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((acc, cur) => acc.likes > cur.likes ? acc : cur, blogs[0])
}

const mostBlogs = (blogs) => {
  let blogResult = {}
  blogs.forEach(blog => blogResult[blog.author] = (blogResult[blog.author] || 0) + 1)

  let maxAuthor = null
  let maxCount = 0
  for (const [author, count] of Object.entries(blogResult)) {
    if (maxCount < count) {
      maxAuthor = author
      maxCount = count
    }
  }

  return { author: maxAuthor, blogs: maxCount }
}

const mostLikes = (blogs) => {
  let blogResult = {}
  blogs.forEach(blog => blogResult[blog.author] = (blogResult[blog.author] || 0) + blog.likes)

  let maxAuthor = null
  let maxLikes = 0
  for (const [author, likes] of Object.entries(blogResult)) {
    if (maxLikes < likes) {
      maxLikes = likes
      maxAuthor = author
    }
  }

  return { author: maxAuthor, likes: maxLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}