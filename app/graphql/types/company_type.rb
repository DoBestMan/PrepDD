module Types
  class CompanyType < GraphQL::Schema::Object
    field :id, ID, null: false
    field :name, String, null: false
    field :is_active, Boolean, null: true
    field :auto_pdf, Boolean, null: true
    field :auto_watermark, Boolean, null: true
    field :preview_only, Boolean, null: true
    field :subscription, SubscriptionType, null: true
    field :total_users, Integer, null: true
    field :total_storage, Integer, null: true

    field :owner, UserType, null: false
    field :parents, [CompanyType], null: true
    field :brokers, [CompanyType], null: true

    field :users, [UserType], null: false
    field :teams, [TeamType], null: false
    field :roles, [RoleType], null: false
    field :logo_url, String, null: true

    def parents
      object.company_parents
    end

    def brokers
      object.broker_parents
    end

    def logo_url
      if object.logo.attached?
        Rails.application.routes.url_helpers.rails_blob_url(object.logo, only_path: true)
      end
    end

    def total_users
      object.users.count
    end

    def total_storage
      #TODO not implemented yet so returning dummy 0
      0
    end
  end
end
