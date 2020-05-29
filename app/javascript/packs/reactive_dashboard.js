import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Dashboard from '../src/pages/Dashoard'
import Login from '../src/pages/Login'

const DashboardRoutes = () => (
  <>
    <Route exact path='/'><Dashboard /></Route>
    <Route path='/login' ><Login /></Route>
  </>
)

const ReactiveDashboard = () => (
  <Router>
    <ul>
      <li><Link to='/'>Reactive Dashboard</Link></li>
      <li><Link to='login'>Login</Link></li>
    </ul>
    <div>
      <DashboardRoutes />
    </div>
  </Router>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ReactiveDashboard />,
    document.getElementById('reactive-dashboard')
  )
})
