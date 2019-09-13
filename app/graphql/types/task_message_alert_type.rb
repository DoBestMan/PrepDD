module Types
  class TaskMessageAlertType < GraphQL::Schema::Object
    description 'TaskMessageAlert'

    field :id, ID, null: false
    field :user, UserType, null: false
    field :taskMessage_, TaskMessage, null: false
    field :isRead, Boolean, null: false
  end
end
