module Types
  class UserDetailsType < GraphQL::Schema::Object
    description 'LoggedInUserDetails'
    field :user, UserType, null: true
    field :owned_companies, [CompanyType], null: true
    field :member_companies, [CompanyType], null: true
    field :teams, [TeamType], null: true
  end
end
