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
    field :roles, [RoleType], null: true
    field :profile_url, String, null: true

    def profile_url
      user = User.find(object.id)
      if user.profile_picture.attached?
        Rails.application.routes.url_helpers.rails_blob_url(user.profile_picture, only_path: true)
      end
    end

    def companies
      team_ids  = object.teams.pluck(:id)
      role_ids = object.roles.pluck(:id)
      object.companies.includes(:teams).where(teams: {id: team_ids})
        .references(:teams).includes(:roles)
        .where(roles: {id: role_ids}).references(:roles)
    end

    def ownedCompanies
      team_ids  = object.teams.pluck(:id)
      object.owned_companies.includes(:teams).where(teams: {id: team_ids})
        .references(:teams).includes(:roles)
        .where(roles: {id: role_ids}).references(:roles)
    end
  end
end
