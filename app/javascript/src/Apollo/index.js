import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider as DefaultApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/link-context'

const authLink = setContext((_, { headers }) => {
  const csfrToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  const jwtToken = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      'Authorization': `Token ${jwtToken}`,
      'X-CSRF-Token': csfrToken
    }
  }
})

const httpLink = createHttpLink({
  uri: '/graphql'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

export const ApolloProvider = ({ children }) => {
  return(
    <DefaultApolloProvider client={client}>
      {children}
    </DefaultApolloProvider>
  )
}

ApolloProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default client
