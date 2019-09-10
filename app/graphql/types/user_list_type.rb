module Types
  class UserListType < GraphQL::Schema::Object
    description 'CurrentUser'

    field :id, String, null: false
    field :lists, [ListType], null: true
  end
end

