# frozen_string_literal: true

GraphqlRouter = GraphqlRails::Router.draw do
  scope module: :graphql do
    resources :todo_lists, only: :index

    mutation :dummy, to: 'graphql_application#dummy_mutation'
  end
end
