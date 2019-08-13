module Types
  class CompanyTeamsType < GraphQL::Schema::Object
    description 'current company teams'

    field :id, ID, null: false
    field :name, String, null: false
    field :teams, [TeamType], null: true
  end
end
