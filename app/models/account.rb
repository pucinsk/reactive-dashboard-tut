class Account < ApplicationRecord
  has_many :todo_lists

  has_secure_password
end
