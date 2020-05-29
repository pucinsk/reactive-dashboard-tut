# frozen_string_literal: true

GraphqlRouter = GraphqlRails::Router.draw do
  scope module: :graphql do
    query :dummy, to: 'graphql_application#dummy_query'
    mutation :dummy, to: 'graphql_application#dummy_mutation'
  end
end
