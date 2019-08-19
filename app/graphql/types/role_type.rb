module Types
  class RoleType < GraphQL::Schema::Object
    description 'All Available Roles'

    field :id, ID, null: false
    field :name, String, null: false
  end
end
