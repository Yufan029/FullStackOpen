import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { Button, TextField, Box, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    username.trim() === '' ? setUsernameError(true) : setUsernameError(false)
    password.trim() === '' ? setPasswordError(true) : setPasswordError(false)

    //handleLogin(username, password)
    dispatch(login(username, password))

    setUsername('')
    setPassword('')
  }

  return (
    <div
      style={{
        justifyContent: 'start',
        marginTop: '4rem',
      }}
    >
      <Typography variant='h4'>log in</Typography>
      <Box
        component='form'
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            error={usernameError}
            helperText={usernameError ? 'Username required' : ''}
            id='standard-basic-username'
            label='username'
            variant='standard'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            error={passwordError}
            helperText={passwordError ? 'Password required' : ''}
            id='standard-basic-password'
            label='password'
            variant='standard'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button
          color='primary'
          size='small'
          variant='contained'
          type='submit'
          endIcon={<LoginIcon />}
        >
          login
        </Button>
      </Box>
    </div>
  )
}

export default LoginForm
