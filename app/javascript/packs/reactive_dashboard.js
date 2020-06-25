import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Dashboard from '../src/pages/Dashoard'
import Login from '../src/pages/Login'
import { ApolloProvider } from '../src/Apollo'
import { AppProvider } from '../src/AppContext'
import AccountSection from '../src/components/AccountSection'

export const Loading = () => <p>Loading...</p>

const DashboardRoutes = () => (
  <>
    <Route exact path='/'><Dashboard /></Route>
    <Route path='/login' ><Login /></Route>
  </>
)

const ReactiveDashboard = () => (
  <ApolloProvider>
    <Router>
      <AppProvider>
        <ul>
          <li><Link to='/'>Reactive Dashboard</Link></li>
          <li><Link to='login'>Login</Link></li>
        </ul>
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
