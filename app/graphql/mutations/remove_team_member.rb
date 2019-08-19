class Mutations::RemoveTeamMember < GraphQL::Schema::Mutation
  argument :companyId, ID, required: true
  argument :userId, ID, required: false
  argument :userIds, [ID], required: false

  field :team, Types::TeamType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(company_id: nil, user_id: nil, user_ids: nil)
    response = { errors: [] }

    if user_id
      team_user = TeamsUser.where(user_id: user_id, team_id: team_id).first
      if team_user
        team_user.destroy!
      else
        response[:errors].push({ path: 'root', message: 'No Team found for this user.' })
        response[:success] = false
        return response
      end

    elsif user_ids.present?
      user_ids.each do |id|
        team_user = TeamsUser.where(user_id: id, team_id: team_id).first
        if team_user
          team_user.destroy!
        end
      end
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


