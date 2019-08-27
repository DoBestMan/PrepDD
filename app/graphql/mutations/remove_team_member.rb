class Mutations::RemoveTeamMember < GraphQL::Schema::Mutation
  argument :teamId, ID, required: true
  argument :userId, ID, required: false
  argument :userIds, [ID], required: false

  field :user, Types::UserType, null: true
  field :teams, [Types::TeamType], null: true
  field :team, Types::TeamType, null: true
  field :companies, [Types::CompanyType], null: true
  field :role, Types::RoleType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(team_id: nil, user_id: nil, user_ids: nil)
    response = { errors: [] }

    if user_id
      TeamsUser.where(user_id: user_id, team_id: team_id).first&.destroy!
    elsif user_ids.present?
      user_ids.each do |id|
        TeamsUser.where(user_id: id, team_id: team_id).first&.destroy!
      end
    end

    company = Team.find(team_id)&.company

    user = User.find(user_id)
    teams = user.teams
    role = RolesUser.where(user_id: user.id, company_id: company.id).first.role
    companies = user.companies

    response[:success] = true
    response[:user] = user
    response[:companies] = companies
    response[:teams] = teams
    response[:role] = role

    response
  end
end


