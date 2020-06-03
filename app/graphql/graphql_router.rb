# frozen_string_literal: true

GraphqlRouter = GraphqlRails::Router.draw do
  scope module: :graphql do
    resources :todo_lists, only: :index
    resources :sessions, only: %i[create]
  end
end
