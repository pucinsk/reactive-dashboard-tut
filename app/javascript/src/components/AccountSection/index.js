import React, { useContext } from 'react'
import AppContext from '../../AppContext'

const AccountSection = () => {
  const { isAuth, token, account } = useContext(AppContext)

  if (!isAuth) return ''

  return (
    <div>
      <p>Your username: {account.username}</p>
      <p>Your token: {token}</p>
    </div>
  )
}

export default AccountSection
