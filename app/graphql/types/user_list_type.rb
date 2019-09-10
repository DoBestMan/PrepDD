module Types
  class UserListType < GraphQL::Schema::Object
    description 'CurrentUser'

    field :id, String, null: false
    field :lists, [ListType], null: true
    field :sections, [TaskSectionType], null: true
  end
end

