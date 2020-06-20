class ApplicationController < ActionController::Base
  private

  def current_account
    @current_account ||= authenticate_with_http_token do |token|
      account_session = AccountSessionFromToken.new(token: token)
      account_session.valid? ? account_session.account : nil
    end
  end
end
