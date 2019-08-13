module Types
  class TeamType < GraphQL::Schema::Object
    description 'CurrentCompany'

    field :id, ID, null: false
    field :name, String, null: false
  end
end
