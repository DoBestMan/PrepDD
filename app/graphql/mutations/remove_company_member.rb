class Mutations::RemoveCompanyMember < GraphQL::Schema::Mutation
  argument :companyId, ID, required: true
  argument :userId, ID, required: false
  argument :userIds, [ID], required: false

  field :user, Types::UserType, null: true
  field :companies, [Types::CompanyType], null: true
  field :teams, [Types::TeamType], null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(company_id: nil, user_id: nil, user_ids: nil)
    response = { errors: [] }

    company = Company.find(company_id)
    company_teams = company.teams.pluck(:id)

    if user_id.present?
      user_teams = TeamsUser.where(user_id: user_id)
      user_teams.where(team_id: company_teams).destroy_all
      UsersCompany.where(user_id: user_id, company_id: company_id).first&.destroy
      RolesUser.where(user_id: user_id, company_id: company_id).first&.destroy
    elsif user_ids.present?
      user_ids.each do |id|
        user_teams = TeamsUser.where(user_id: id)
        user_teams.where(team_id: company_teams).destroy_all

        UsersCompany.where(user_id: id, company_id: company_id).first&.destroy
        RolesUser.where(user_id: id, company_id: company_id).first&.destroy
      end
    end

    user = User.find(user_id)
    teams = user.teams
    companies = user.companies

    response[:success] = true
    response[:user] = user
    response[:companies] = companies
    response[:teams] = teams

    response
  end
end
