import { Box, Typography } from '@mui/material'

const UserInfo = ({ userInfo }) => {
  if (!userInfo) {
    return null
  }

  console.log(userInfo)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.5rem',
      }}
    >
      <Typography variant='h3'>{userInfo.name}</Typography>
      <Typography variant='h6'>Added Blogs:</Typography>
      <ul>
        {userInfo.blogs.map((blog) => (
          <li key={blog.id}>
            <Typography variant='h5'>{blog.title}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  )
}

export default UserInfo
