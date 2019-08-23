module Types
  class CompanyUsersType < GraphQL::Schema::Object
    description 'CompanyUsers'

    field :company, CompanyType, null: false
    field :users, [UserType], null: true
  end
end
