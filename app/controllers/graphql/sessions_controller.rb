module Graphql
  class SessionsController < GraphqlApplicationController
    model('AccountSession')

    action(:create)
      .permit(:username, :password)
      .returns_single(required: false)

    def create
      if account_session.valid?
        account_session
      else
        render errors: account_session.errors.full_messages
      end
    end

    private

    def account_session
      @account_session = AccountSession.create(
        username: params[:username],
        password: params[:password]
      )
    end
  end
end
