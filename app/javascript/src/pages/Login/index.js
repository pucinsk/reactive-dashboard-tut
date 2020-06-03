import React, { createContext, useContext, useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import AppContext from '../../AppContext'

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($username: String, $password: String){
    createSession(username: $username, password: $password){
      token
    }
  }
`

const LoginContext = createContext()
const LoginProvider = ({ children }) => {
  const { setToken, setAppLoading, setError, redirectHome } = useContext(AppContext)

  const [login, { loading, error }] = useMutation(
    LOGIN_MUTATION,
    {
      onCompleted ({ createSession: { token } }) {
        setToken(token)
        redirectHome()
      },
      onError({ graphQLErrors }) {
        setError(graphQLErrors[0].message)
      }
    }
  )

  useEffect(() => { setAppLoading(loading) }, [loading])

  return (
    <LoginContext.Provider
      value={{
        login,
        error
      }}
    >
      {children}
    </LoginContext.Provider>
    )
}

const LoginError = () => {
  const { error } = useContext(LoginContext)

  if (!error) return ''

  return (
    <p>Error: {error}</p>
  )
}

const LoginForm = () => {
  const { login } = useContext(LoginContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ variables: { username, password }})
  }

  return (
    <>
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username </label>
        <input name="username" autoComplete="true" type="text" onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label htmlFor="password">Password</label>
        <input name="password" autoComplete="true" type="password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <input type="submit" value="Login" />
      </form>
      <LoginError />
    </>
  )
}

const Login = () => (
  <LoginProvider>
    <LoginForm />
  </LoginProvider>
)

export default Login
