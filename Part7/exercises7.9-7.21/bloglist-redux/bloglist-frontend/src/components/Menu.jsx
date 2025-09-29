import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Menu = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const padding = {
    padding: 5,
  }

  return (
    <div>
      <Link style={padding} to='/'>
        Blogs
      </Link>
      <Link style={padding} to='/users'>
        Users
      </Link>
      <span>
        {user.name} logged in
        <button onClick={() => dispatch(logout())}>log out</button>
      </span>
    </div>
  )
}

export default Menu
