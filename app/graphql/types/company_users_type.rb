module Types
  class CompanyUsersType < GraphQL::Schema::Object
    description 'CompanyUsers'

    field :id, ID, null: false

    field :company, CompanyType, null: false
    field :users, [UserType], null: true
  end
end
