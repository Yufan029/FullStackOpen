import {
  Paper,
  TableBody,
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  if (!users) {
    return null
  }

  return (
    <TableContainer component={Paper} style={{ width: '40vw' }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table' size='small'>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant='h6'>Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant='h6'>Blogs created</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>
                  <Typography variant='h5'>{user.name}</Typography>
                </Link>{' '}
              </TableCell>
              <TableCell>
                <Typography variant='h5'>{user.blogs.length}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Users
