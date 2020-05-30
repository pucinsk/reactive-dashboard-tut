johndoe = Account.create(username: 'johndoe', password: 'password', password_confirmation: 'password')
luke = Account.create(username: 'luke', password: 'lukepassword', password_confirmation: 'lukepassword')

john_asap = TodoList.create(title: 'asap', account: johndoe)
john_next_sprint = TodoList.create(title: 'next_sprint', account: johndoe)
luke_homework = TodoList.create(title: 'homework', account: luke)

(1...15).each do |n|
  TodoItem.create(
    title: "Item ##{n}",
    todo_list: [john_asap, john_next_sprint, luke_homework].sample,
    done: [true, false].sample
  )
end
