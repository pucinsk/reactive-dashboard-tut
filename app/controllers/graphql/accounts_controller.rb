module Graphql
  class AccountsController < GraphqlApplicationController
    before_action :require_account

    model('Account')

    action(:me).returns_single(required: false)

    def me
      current_account
    end
  end
end
