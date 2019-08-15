module Types
  class UserType < GraphQL::Schema::Object
    description 'User'

    field :id, ID, null: false
    field :fullName, String, null: false
    field :email, String, null: false
    field :displayName, String, null: false
    field :ownedCompanies, [CompanyType], null: true
    field :companies, [CompanyType], null: true
    field :teams, [TeamType], null: true
  end
end
