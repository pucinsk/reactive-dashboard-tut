import React, { useContext } from 'react'
import AppContext from '../../AppContext'

const AccountSection = () => {
  const { isAuth, token } = useContext(AppContext)

  if (!isAuth) return ''

  return (
    <div>
      <p>Your token: {token}</p>
    </div>
  )
}

export default AccountSection
