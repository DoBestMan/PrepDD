module Types
  class UserType < GraphQL::Schema::Object
    description 'User'

    field :fullName, String, null: false
    field :email, String, null: false
  end
end
