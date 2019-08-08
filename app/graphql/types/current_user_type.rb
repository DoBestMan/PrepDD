module Types
  class CurrentUserType < GraphQL::Schema::Object
    description 'CurrentUser'

    field :id, String, null: false
    field :user, UserType, null: true
  end
end
