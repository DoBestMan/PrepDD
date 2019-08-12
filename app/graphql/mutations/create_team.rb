class Mutations::CreateTeam < GraphQL::Schema::Mutation
  argument :name, String, required: true
  argument :companyID, String, required: true

  field :team, Types::TeamType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(name: nil, company_id: nil)
    response = { errors: [] }

    if !context[:controller].user_signed_in?
      response[:errors].push({ path: 'root', message: 'Not authorized to do it.' })
      response[:success] = false
      return response
    end

    team = Team.create(
                 name: name,
                 company_id: company_id,
                 is_active: true
    )

    team.errors.messages.each do |path, messages|
      messages.each do |message|
        response[:errors].push(
          { path: path.to_s.camelcase(:lower), message: message }
        )
        response[:success] = false
      end
    end

    if team&.persisted?
      response[:success] = true
      response
    end

    response
  end
end
