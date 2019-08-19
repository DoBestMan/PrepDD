module Types
  class TeamType < GraphQL::Schema::Object
    description 'Team'

    field :id, ID, null: false
    field :name, String, null: false
    field :users, [UserType], null: false
    field :company, CompanyType, null: false
  end
end
