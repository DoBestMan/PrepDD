module Types
  class CurrentUserType < GraphQL::Schema::Object
    description 'CurrentUser'

    field :id, String, null: false
    field :user, UserType, null: true
    field :owned_companies, [CompanyType], null: true
    field :member_companies, [CompanyType], null: true
    field :teams, [TeamType], null: true
  end
end
