module Types
  class TaskMessageType < GraphQL::Schema::Object
    description 'TaskMessage'

    field :id, ID, null: false
    field :user, UserType, null: false
    field :task, TaskType, null: false
    field :message, String, null: false 
    field :isPublic, Boolean, null: false
    # Right now, we're not implementing editing on messages -- 
    # but we will, so this field name will change
    field :createdAt, String, null: false, method: :last_updated_at
  end
end
