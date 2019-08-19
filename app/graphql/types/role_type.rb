module Types
  class RoleType < GraphQL::Schema::Object
    description 'User Roles'

    field :id, ID, null: false
    field :name, String, null: false
  end
end
