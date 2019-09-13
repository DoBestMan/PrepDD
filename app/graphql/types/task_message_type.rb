module Types
  class TaskMessageType < GraphQL::Schema::Object
    description 'TaskMessage'

    field :id, ID, null: false
    field :user, UserType, null: false
    field :task, TaskType, null: false
    field :message, String, null: false 
    field :isPublic, Boolean, null: false
  end
end