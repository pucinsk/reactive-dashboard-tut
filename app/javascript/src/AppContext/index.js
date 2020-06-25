import React, { createContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { gql, useLazyQuery } from '@apollo/client'
import { Loading } from '../../packs/reactive_dashboard'

const initialState = {
  account: null,
  token: localStorage.getItem('token')
}

const AppContext = createContext(initialState)

export const AppProvider = ({ children }) => {
  const [account, setAccount] = useState(initialState.account)
  const [token, setToken] = useState(initialState.token)
  const [redirectToHome, setRedirectToHome] = useState(false)
  const [appLoading, setAppLoading] = useState(false)

  const CURRENT_ACCOUNT = gql`
    query{
      me{
        id
        username
      }
    }
  `

  const [fetchCurrentAccount, {
    loading: loadingCurrentAccount
  }] = useLazyQuery(
    CURRENT_ACCOUNT,
    {
      onCompleted ({ me }) {
        setAccount(me)
      }
    }
  )

  useEffect(() => {
    localStorage.setItem('token', token)

    if (token && !account) {
      fetchCurrentAccount()
    }
  }, [token])

  useEffect(() => { redirectToHome && setRedirectToHome(false) }, [redirectToHome])
  useEffect(() => { setAppLoading(loadingCurrentAccount) }, [loadingCurrentAccount])

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
      {
        appLoading
          ? <Loading />
          : children
      }
    </AppContext.Provider>
  )
}

export default AppContext
