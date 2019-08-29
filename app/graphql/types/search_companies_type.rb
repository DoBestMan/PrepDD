module Types
  class SearchCompaniesType < GraphQL::Schema::Object
    description 'Search companies by company name or user name & email'

    field :id, String, null: false
    field :users, [UserType], null: true
    field :companies, [CompanyType], null: true
  end
end