module Graphql
  class TodoListsController < GraphqlApplicationController
    model('TodoList')

    # Will generate [TodoItem]! return type
    action(:index)
      .returns_list(required_list: true, required_inner: false)

    def index
      TodoList.all
    end
  end
end
