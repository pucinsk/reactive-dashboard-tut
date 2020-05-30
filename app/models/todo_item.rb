class TodoItem < ApplicationRecord
  belongs_to :todo_list

  delegate :account, to: :todo_list
end
