import React, { useState, useEffect, useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import AppContext from '../../AppContext'

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
  const { setAppLoading, setAppError } = useContext(AppContext)
  const [todoLists, setTodoLists] = useState([])
  const { loading, error } = useQuery(
    TODO_LISTS_QUERY, {
    onCompleted({ todoLists }) {
      setTodoLists(todoLists)
    }
  })

  useEffect(() => { setAppLoading(loading) }, [loading])
  useEffect(() => { setAppError(error) }, [error])

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
  <TodoLists />
)

export default Dashboard
