module Types
  class CompanyType < Types::BaseObject
    field :id, ID, null: false
    field :parent_id, ID, null: false
    field :broker_co_id, ID, null: false
    field :subscription_id, ID, null: false
    field :owner_id, ID, null: false
    field :is_active, Boolean, null: false
    field :email, String, null: false
  end
end
