module Types
  class CompanyType < GraphQL::Schema::Object
    field :id, ID, null: false
    field :parent_id, ID, null: true
    field :broker_co_id, ID, null: true
    field :subscription_id, ID, null: true
    field :owner_id, ID, null: false
    field :is_active, Boolean, null: false
    field :name, String, null: false
    field :owner, UserType, null: false
    field :users, [UserType], null: true
    field :teams, [TeamType], null: true
  end
end
