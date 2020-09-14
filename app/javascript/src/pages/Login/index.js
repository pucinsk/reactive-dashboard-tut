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
  const { setToken, setAppLoading, setAppError, redirectHome } = useContext(AppContext)

  const [login, { loading }] = useMutation(
    LOGIN_MUTATION,
    {
      onCompleted ({ createSession: { token } }) {
        setToken(token)
        redirectHome()
      },
      onError({ graphQLErrors }) {
        setAppError(graphQLErrors[0].message)
      }
    }
  )

  useEffect(() => { setAppLoading(loading) }, [loading])

  return (
    <LoginContext.Provider
      value={{
        login
      }}
    >
      {children}
    </LoginContext.Provider>
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
    </>
  )
}

const Login = () => (
  <LoginProvider>
    <LoginForm />
  </LoginProvider>
)

export default Login
