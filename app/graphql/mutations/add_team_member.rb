class Mutations::AddTeamMember <  GraphQL::Schema::Mutation
  argument :teamId, ID, required: true
  argument :email, String, required: true
  argument :fullName, String, required: true
  argument :role, ID, required: true

  field :team, Types::TeamType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(team_id: nil, email: nil, full_name: nil, role: nil)
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

    team_user = TeamsUser.create( user_id: user.id, team_id: team_id )

    user_role = RolesUser.create(user_id: user.id, role_id: role)


    team_user.errors.messages.each do |path, messages|
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

    role.errors.messages.each do |path, messages|
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
