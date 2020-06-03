class AccountSession
  include ActiveModel::Validations
  include GraphqlRails::Model

  validate :require_account_to_exist
  validate :require_valid_credentials

  graphql do |gql|
    gql.attribute :account, type: 'Account'
    gql.attribute :token
  end

  def token
    SecureRandom.hex(10)
  end

  def account
    return @account if defined?(@account)

    @account = Account.find_by(username: username)
  end

  def initialize(username:, password:)
    @username = username
    @password = password
  end

  class << self
    def create(username:, password:)
      new(username: username, password: password).tap(&:valid?)
    end
  end


  private

  attr_reader :username, :password

  def require_account_to_exist
    return if account.present?

    errors.add('account', 'has bad credentials')
  end

  def require_valid_credentials
    return if !account || account.authenticate(password)

    errors.add('account', 'has bad credentials')
  end
end
