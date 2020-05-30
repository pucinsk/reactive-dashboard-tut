import React, { createContext, useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Dashboard from '../src/pages/Dashoard'
import Login from '../src/pages/Login'
import { ApolloProvider } from '../src/Apollo'

import '../src/styles.css'

const DashboardRoutes = () => (
  <>
    <Route exact path='/'><Dashboard /></Route>
    <Route path='/login' ><Login /></Route>
  </>
)

export const AppContext = createContext()

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

const AppProvider = ({ children }) => {
  const [appLoading, setAppLoading] = useState(false)
  const [appError, setAppError] = useState('')

  return (
    <AppContext.Provider
      value={{
        appLoading,
        setAppLoading,
        appError,
        setAppError
      }}
    >
      <Loader />
      <Error />
      {children}
    </AppContext.Provider>
  )
}

export default AppContext

const ReactiveDashboard = () => (
  <ApolloProvider>
    <AppProvider>
      <Router>
        <ul>
          <li><Link to='/'>Reactive Dashboard</Link></li>
          <li><Link to='login'>Login</Link></li>
        </ul>
        <hr />
        <div>
          <DashboardRoutes />
        </div>
      </Router>
    </AppProvider>
  </ApolloProvider>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ReactiveDashboard />,
    document.getElementById('reactive-dashboard')
  )
})
