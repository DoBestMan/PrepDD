module Types
  class TaskSectionType < GraphQL::Schema::Object
    description 'TaskSection'

    field :id, ID, null: false
    field :name, String, null: true
    field :tasks, [TaskType], null: true
  end
end
