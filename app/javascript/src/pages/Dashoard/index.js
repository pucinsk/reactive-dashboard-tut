import React, { useState, createContext, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'

const DashboardContext = createContext()

const DashboardProvider = ({ children }) => {
  const [todoLists, setTodoLists] = useState([])

  return (
    <DashboardContext.Provider
      value={{
        todoLists,
        setTodoLists
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const TODO_LISTS_QUERY = gql`
  query getTodoLists{
    todoLists {
      id
      title
      isDone
      account{
        username
      }
    }
  }
`

const TodoLists = () => {
  const { todoLists, setTodoLists } = useContext(DashboardContext)
  const { loading, error, data: todoListsData } = useQuery(TODO_LISTS_QUERY)

  useEffect(() => {
    if (!loading && todoListsData) {
      setTodoLists(todoListsData.todoLists)
    }
  }, [loading])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :{error}</p>

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th />
            <th>List title</th>
            <th>Done</th>
            <th>Belongs to</th>
          </tr>
        </thead>
        <tbody>
          {
            todoLists.map(({ id, title, isDone, account: { username } }, idx) => (
              <tr key={id}>
                <td>{idx + 1}. </td>
                <td>{title}</td>
                <td>{isDone ? 'Yes' : 'No'}</td>
                <td>{username}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

const Dashboard = () => (
  <DashboardProvider>
    <TodoLists />
  </DashboardProvider>
)

export default Dashboard
