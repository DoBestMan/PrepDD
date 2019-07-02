module Types
  class UserType < GraphQL::Schema::Object
    description 'User'

    field :lastName, String, null: false
    field :firstName, String, null: false
    field :email, String, null: false
  end
end
