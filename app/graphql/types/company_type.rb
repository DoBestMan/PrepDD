module Types
  class CompanyType < GraphQL::Schema::Object
    field :id, ID, null: false
    field :name, String, null: false
    field :is_active, Boolean, null: true
    field :auto_pdf, Boolean, null: true
    field :auto_watermark, Boolean, null: true
    field :preview_only, Boolean, null: true
    field :subscription, SubscriptionType, null: true

    field :owner, UserType, null: false
    field :parent, CompanyType, null: true

    field :users, [UserType], null: false
    field :teams, [TeamType], null: false
  end
end
