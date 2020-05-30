class Account < ApplicationRecord
  include GraphqlRails::Model

  has_many :todo_lists

  has_secure_password

  graphql do |gql|
    gql.attribute :id
    gql.attribute :username
    gql.attribute :created_at, type: GraphQL::Types::ISO8601Date
    gql.attribute :updated_at, type: GraphQL::Types::ISO8601Date
  end
end
