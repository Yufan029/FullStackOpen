import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Typography, Button, Box } from '@mui/material'

const Menu = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const marginRight = {
    marginRight: 15,
  }

  return (
    <Box
      sx={{
        marginTop: '3rem',
        marginBottom: '2rem',
        display: 'flex',
        alignContent: 'center',
      }}
    >
      <Link style={marginRight} to='/'>
        <Typography variant='h5'>Blogs</Typography>
      </Link>
      <Link style={marginRight} to='/users'>
        <Typography variant='h5'>Users</Typography>
      </Link>
      <Typography style={marginRight} variant='h5'>
        {user.name} logged in
      </Typography>
      <Button
        color='secondary'
        size='small'
        variant='contained'
        onClick={() => dispatch(logout())}
      >
        log out
      </Button>
    </Box>
  )
}

export default Menu
