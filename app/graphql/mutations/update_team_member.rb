class Mutations::UpdateTeamMember < GraphQL::Schema::Mutation
  argument :id, ID, required: true
  argument :fullName, String, required: true
  argument :companyId, ID, required: true
  argument :role, ID, required: true

  field :team, Types::TeamType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(id: nil, full_name: nil, role: nil, company_id: nil)
    response = { errors: [] }

    user = User.find(id)

    if user && full_name
      user.update(
        full_name: full_name
      )
    end

    if role && company_id
      RolesUser.where(user_id: user.id, company_id: company_id).first&.destroy!

      user_new_role = RolesUser.create(user_id: user.id, role_id: role, company_id: company_id)


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

    if user&.persisted?
      response[:success] = true
      response
    end

    response
  end
end
