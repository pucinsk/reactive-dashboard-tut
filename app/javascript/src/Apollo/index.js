import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider as DefaultApolloProvider } from '@apollo/client';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const csfrToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: {
    'X-CSRF-Token': csfrToken
  },
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql',
  })
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
