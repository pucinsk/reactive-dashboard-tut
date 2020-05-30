class TodoItem < ApplicationRecord
  include GraphqlRails::Model
  belongs_to :todo_list

  delegate :account, to: :todo_list

  graphql do |gql|
    gql.attribute :id
    gql.attribute :title
    gql.attribute :done?
    gql.attribute :account, type: 'Account'
    gql.attribute :created_at, type: GraphQL::Types::ISO8601Date
    gql.attribute :updated_at, type: GraphQL::Types::ISO8601Date
  end

  def done?
    done
  end
end
