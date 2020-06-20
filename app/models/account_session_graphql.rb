module AccountSessionGraphql
  extend ActiveSupport::Concern

  include GraphqlRails::Model

  included do
    graphql do |gql|
      gql.attribute :account, type: 'Account'
      gql.attribute :token
    end
  end
end
