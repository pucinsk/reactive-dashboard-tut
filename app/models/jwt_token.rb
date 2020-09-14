class JwtToken
  HMACK = 'HS256'.freeze

  def initialize(account:)
    @account = account
  end

  class << self
    def decode(token)
      JWT.decode(token, hmac_secret, true, algorithm: HMACK)[0]
    rescue JWT::DecodeError
      {}
    end

    def hmac_secret
      Rails.application.credentials.hmac_secret
    end
  end

  def token
    @token ||= JWT.encode(payload, hmac_secret, HMACK)
  end

  private

  attr_reader :account

  def payload
    {
      account_id: account.id,
      exp: expires_at.to_i
    }
  end

  def expires_at
    1.hour.from_now
  end

  def hmac_secret
    self.class.hmac_secret
  end
end
