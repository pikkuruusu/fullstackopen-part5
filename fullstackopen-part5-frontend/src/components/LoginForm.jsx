import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            type='text'
            value={username}
            data-testid='username'
            name='Username'
            onChange={({ target }) => handleUsernameChange(target.value)}
          />
        </div>
        <div>
        password
          <input
            type='password'
            value={password}
            data-testid='password'
            name='Password'
            onChange={({ target }) => handlePasswordChange(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm