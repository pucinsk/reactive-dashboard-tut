import React, { createContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const initialState = {
  account: null,
  token: null
}

const AppContext = createContext(initialState)

export const AppProvider = ({ children }) => {
  const [account, setAccount] = useState(initialState.account)
  const [token, setToken] = useState(initialState.token)
  const [redirectToHome, setRedirectToHome] = useState(false)

  useEffect(() => { localStorage.setItem('token', token) }, [token])
  useEffect(() => { redirectToHome && setRedirectToHome(false) }, [redirectToHome])

  if (redirectToHome) return <Redirect to='/' />

  return (
    <AppContext.Provider
      value={{
        account,
        setAccount,
        token,
        setToken,
        setRedirectToHome
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
