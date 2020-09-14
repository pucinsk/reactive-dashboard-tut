import React, { createContext, useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import JwtDecode from 'jwt-decode'
import { useLazyQuery, gql } from '@apollo/client'

import '../../src/styles.css'

const initialState = {
  token: JSON.parse(localStorage.getItem('token')),
  account: {
    id: null,
    username: null
  },
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
      <p><small>{appError}</small></p>
    </div>
  )
}

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(initialState.token)
  const [account, setAccount] = useState(initialState.account)
  const [isAuth, setIsAuth] = useState(initialState.isAuth)
  const [appLoading, setAppLoading] = useState(initialState.appLoading)
  const [appError, setAppError] = useState(initialState.appError)

  const history = useHistory()
  const redirectHome = () => history.push('/')

  const ME = gql`
    query me{
      me {
        id
        username
      }
    }
  `
  const [fetchCurrentAccount, { loading: fetchCurrentAccountLoading }] = useLazyQuery(
    ME, {
      onCompleted({ me }) {
        setAccount(me)
      }
    }
  )

  const isTokenValid = () => {
    try {
      return token && (JwtDecode(token).exp * 1000)  > Date.now()
    } catch {
      return false
    }
  }

  // On first load
  useEffect(() => setIsAuth(isTokenValid()), [])
  useEffect(() => {
    setIsAuth(isTokenValid())
    localStorage.setItem('token', JSON.stringify(token))
  }, [token])

  useEffect(() => { isAuth && fetchCurrentAccount() }, [isAuth])
  useEffect(() => { setAppLoading(fetchCurrentAccountLoading) }, [fetchCurrentAccountLoading])

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
        redirectHome,
        account
      }}
    >
      <Loader />
      <Error />
      { children}
    </AppContext.Provider>
  )
}

export default AppContext
