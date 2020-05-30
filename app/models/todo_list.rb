class TodoList < ApplicationRecord
  belongs_to :account
  has_many :todo_items
end
