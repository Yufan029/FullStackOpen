const UserInfo = ({ userInfo }) => {
  if (!userInfo) {
    return null
  }

  console.log(userInfo)
  return (
    <div>
      <h2>{userInfo.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {userInfo.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserInfo
