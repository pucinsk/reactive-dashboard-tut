import React from 'react'

const Login = () => (
  <>
    <p>Login</p>
    <form>
      <label htmlFor="username">Username </label>
      <input name="username" autoComplete="true" type="text" />
      <br />
      <label htmlFor="password">Password</label>
      <input name="password" autoComplete="true" type="password" />
      <br />
      <input type="submit" value="Login" />
    </form>
  </>
)

export default Login
