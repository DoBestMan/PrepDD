class Mutations::AddTeamMember <  GraphQL::Schema::Mutation
  argument :teamId, ID, required: true
  argument :userId, ID, required: true

  field :team, Types::TeamType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(team_id: nil, user_id: nil)
    response = { errors: [] }

    team_user = TeamsUser.create(
                           user_id: user_id, team_id: team_id
    )

    team_user.errors.messages.each do |path, messages|
      messages.each do |message|
        response[:errors].push(
          { path: path.to_s.camelcase(:lower), message: message }
        )
        response[:success] = false
      end
    end

    if team_user&.persisted?
      response[:success] = true
      response
    end

    response
  end

end
