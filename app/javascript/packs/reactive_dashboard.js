import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Dashboard from '../src/pages/Dashoard'
import Login from '../src/pages/Login'
import { ApolloProvider } from '../src/Apollo'
import AppContext, { AppProvider } from '../src/AppContext'
import AccountSection from '../src/components/AccountSection'

import '../src/styles.css'

const DashboardRoutes = () => (
  <>
    <Route exact path='/'><Dashboard /></Route>
    <Route path='/login' ><Login /></Route>
  </>
)

const DashboardMenu = () => {
  const { isAuth } = useContext(AppContext)

  return (
    <ul>
      <li><Link to='/'>Reactive Dashboard</Link></li>
      { !isAuth ? <li><Link to='login'>Login</Link></li> : '' }
    </ul>
  )
}

const ReactiveDashboard = () => (
  <ApolloProvider>
    <Router>
      <AppProvider>
        <DashboardMenu />
        <AccountSection />
        <hr />
        <div>
          <DashboardRoutes />
        </div>
      </AppProvider>
    </Router>
  </ApolloProvider>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ReactiveDashboard />,
    document.getElementById('reactive-dashboard')
  )
})
