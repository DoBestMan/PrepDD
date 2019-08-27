class Mutations::UpdateTeamMember < GraphQL::Schema::Mutation
  argument :id, ID, required: true
  argument :fullName, String, required: true
  argument :companyId, ID, required: true
  argument :role, ID, required: true

  field :user, Types::UserType, null: false
  field :companies, [Types::CompanyType], null: false
  field :teams, [Types::TeamType], null: false
  field :role, Types::RoleType, null: false
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(id: nil, full_name: nil, role: nil, company_id: nil)
    response = { errors: [] }

    user = User.find(id)

    user.update(full_name: full_name) if user && full_name

    if role && company_id
      RolesUser.where(user_id: user.id, company_id: company_id).first&.destroy!

      user_new_role =
        RolesUser.create(
          user_id: user.id, role_id: role, company_id: company_id
        )

      user_new_role.errors.messages.each do |path, messages|
        messages.each do |message|
          response[:errors].push(
            { path: path.to_s.camelcase(:lower), message: message }
          )
          response[:success] = false
        end
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

    teams = user.teams.where(company_id: company_id)
    role = RolesUser.where(user_id: user.id, company_id: company_id).first.role
    companies = user.companies

    if user&.persisted?
      response[:success] = true
      response[:user] = user
      response[:companies] = companies
      response[:teams] = teams
      response[:role] = role
      response
    end

    response
  end
end
