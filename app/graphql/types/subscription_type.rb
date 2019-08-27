module Types
  class SubscriptionType < GraphQL::Schema::Object
    field :id, ID, null: false
    field :name, String, null: false
    field :description, String, null: true
    field :max_users, String, null: true
    field :max_storage, String, null: true
    field :additional_storage, String, null: true
    field :auto_pdf, Boolean, null: true
    field :auto_watermark, Boolean, null: true
  end
end
