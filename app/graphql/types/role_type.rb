module Types
  class RoleType < GraphQL::Schema::Object
    description 'All Available Roles'

    field :id, ID, null: false
    field :title, String, null: false
  end
end
