import React, { useContext } from 'react'
import AppContext from '../../AppContext'

const AccountSection = () => {
  const { account, token } = useContext(AppContext)

  if (!account) return ''

  return (
    <div>
      <p>You are: {account.username}</p>
      <p>Your token: {token}</p>
    </div>
  )
}

export default AccountSection
