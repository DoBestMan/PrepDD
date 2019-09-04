module Types
  class SearchCompanyUsersType < GraphQL::Schema::Object
    description 'Search users by company id'

    field :id, String, null: false
    field :users, [UserType], null: true
    field :teams, [TeamType], null: true
  end
end