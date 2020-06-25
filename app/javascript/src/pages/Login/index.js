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
  const { setToken, setRedirectToHome } = useContext(AppContext)
  const [login, { data, loading, error: apolloError }] = useMutation(LOGIN_MUTATION, { errorPolicy: 'all' })
  const [error, setError] = useState('')

  useEffect(() => {
    if (data?.createSession) {
      setToken(data.createSession.token)
      setRedirectToHome(true)
    }
  }, [data])

  useEffect(() => {
    if (apolloError?.graphQLErrors) {
      setError(apolloError.graphQLErrors[0].message)
    } else {
      setError('')
    }
  }, [apolloError])

  return (
    <LoginContext.Provider
      value={{
        login,
        loading,
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
  const { login, loading } = useContext(LoginContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ variables: { username, password }})
  }

  if (loading) return <p>Loading...</p>

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
