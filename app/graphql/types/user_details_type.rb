module Types
  class UserDetailsType < GraphQL::Schema::Object
    description 'UserDetails'

    field :id, String, null: false
    field :user, UserType, null: true
    field :role, RoleType, null: true
  end
end
