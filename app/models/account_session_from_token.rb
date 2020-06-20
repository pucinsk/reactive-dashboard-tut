class AccountSessionFromToken
  include ActiveModel::Validations

  attr_reader :token

  validate :require_account_to_exist

  def initialize(token:)
    @token = token
  end

  def account
    return @account if defined?(@account)

    payload = JwtToken.decode(token).symbolize_keys

    @account = Account.find(payload[:account_id])
  rescue ActiveRecord::RecordNotFound
    @account = nil
  end

  private

  def require_account_to_exist
    return if account.present?

    errors.add('token', 'is invalid')
  end
end
