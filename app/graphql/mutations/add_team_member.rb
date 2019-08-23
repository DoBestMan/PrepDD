class Mutations::AddTeamMember <  GraphQL::Schema::Mutation
  argument :team, String, required: true
  argument :companyId, ID, required: true
  argument :email, String, required: true
  argument :fullName, String, required: true
  argument :role, ID, required: true

  field :team, Types::TeamType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(team: nil, email: nil, full_name: nil, role: nil, company_id: nil)
    response = { errors: [] }

    user = User.find_by_email(email)

    if !user.present?
      password = Devise.friendly_token[0,20]
      user =
        User.create(
          {
            full_name: full_name,
            email: email,
            password: password,
            password_confirmation: password,
          }
        )
    end

    company = Company.find(company_id)

    if team.present?
      company_team = company.teams.where(name: team).first_or_create
      team_user = TeamsUser.create( user_id: user.id, team_id: company_team.id)

      team_user.errors.messages.each do |path, messages|
        messages.each do |message|
          response[:errors].push(
            { path: path.to_s.camelcase(:lower), message: message }
          )
          response[:success] = false
        end
      end
    end

    user_role = RolesUser.create(user_id: user.id, role_id: role, company_id: company_id)

    user_company = UsersCompany.where(user_id: user.id, company_id: company_id).all
    if !user_company.present?
      user_company = UsersCompany.create(user_id: user.id, company_id: company_id)
    end

    user_role.errors.messages.each do |path, messages|
      messages.each do |message|
        response[:errors].push(
          { path: path.to_s.camelcase(:lower), message: message }
        )
        response[:success] = false
      end
    end

    user.errors.messages.each do |path, messages|
      messages.each do |message|
        response[:errors].push(
          { path: path.to_s.camelcase(:lower), message: message }
        )
        response[:success] = false
      end
    end

    if user&.persisted?
      response[:success] = true
      response
    end

    response
  end

end
