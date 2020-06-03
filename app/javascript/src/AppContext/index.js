import React, { createContext, useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import JwtDecode from 'jwt-decode'

import '../../src/styles.css'

const initialState = {
  token: JSON.parse(localStorage.getItem('token')),
  isAuth: false,
  appLoading: false,
  appError: ''
}

const AppContext = createContext(initialState)

const Loader = () => {
  const { appLoading } = useContext(AppContext)

  if (!appLoading) return null

  return (
    <div className="loader">
      <p>Loading...</p>
    </div>
  )
}

const Error = () => {
  const { appError } = useContext(AppContext)

  if (!appError) return null

  console.error(appError)

  return (
    <div className="error">
      <p>Error...</p>
    </div>
  )
}

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(initialState.token)
  const [isAuth, setIsAuth] = useState(initialState.isAuth)
  const [appLoading, setAppLoading] = useState(initialState.appLoading)
  const [appError, setAppError] = useState(initialState.appError)

  const history = useHistory()
  const redirectHome = () => history.push('/')

  useEffect(() => {
    try {
      const isValid = token && (JwtDecode(token).exp * 1000)  > Date.now()
      setIsAuth(isValid)
    } catch {
      setIsAuth(false)
    }
    localStorage.setItem('token', JSON.stringify(token))
  }, [token])

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        isAuth,
        appLoading,
        setAppLoading,
        appError,
        setAppError,
        redirectHome
      }}
    >
      <Loader />
      <Error />
      { children}
    </AppContext.Provider>
  )
}

export default AppContext
