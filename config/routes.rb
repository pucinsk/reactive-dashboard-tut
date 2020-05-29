Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  root to: 'pages#index'

  get '*path', to: 'pages#index'
end
