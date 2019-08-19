class Mutations::RemoveTeamMember < GraphQL::Schema::Mutation
  argument :teamId, ID, required: true
  argument :userId, ID, required: true

  field :team, Types::TeamType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(team_id: nil, user_id: nil)
    response = { errors: [] }

    team_user = TeamsUser.where(user_id: user_id, team_id: team_id).first


    if team_user
      team_user.destroy!
    else
      response[:errors].push({ path: 'root', message: 'No Team found for this user.' })
      response[:success] = false
      return response
    end

    team_user.errors.messages.each do |path, messages|
      messages.each do |message|
        response[:errors].push(
          { path: path.to_s.camelcase(:lower), message: message }
        )
        response[:success] = false
      end
    end


    response[:success] = true
    response

    response
  end
end


