class TodoList < ApplicationRecord
  include GraphqlRails::Model

  belongs_to :account
  has_many :todo_items

  graphql do |gql|
    gql.attribute :id
    gql.attribute :title
    gql.attribute :account, type: 'Account'
    gql.attribute :todo_items, type: '[TodoItem]'
    gql.attribute :done?
    gql.attribute :created_at, type: GraphQL::Types::ISO8601Date
    gql.attribute :updated_at, type: GraphQL::Types::ISO8601Date
  end

  def done?
    todo_items.all?(&:done)
  end
end
