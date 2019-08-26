module Types
  class UserType < GraphQL::Schema::Object
    description 'User'

    field :id, ID, null: false
    field :fullName, String, null: false
    field :email, String, null: false
    field :displayName, String, null: true
    field :ownedCompanies, [CompanyType], null: true
    field :companies, [CompanyType], null: true
    field :teams, [TeamType], null: true
    field :roles, [RolesUserType], null: true
    field :lastViewedCompanyId, ID, null: true
    field :profile_url, String, null: true

    def profile_url
      if object.profile_picture.attached?
        Rails.application.routes.url_helpers.rails_blob_url(object.profile_picture, only_path: true)
      end
    end

    def roles
      object.roles_users
    end
  end
end
