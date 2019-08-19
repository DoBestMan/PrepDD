class Mutations::UpdateTeamMember < GraphQL::Schema::Mutation
  argument :email, String, required: true
  argument :fullName, String, required: true
  argument :companyId, ID, required: true
  argument :newRole, ID, required: true
  argument :oldRole, ID, required: true

  field :team, Types::TeamType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(email: nil, full_name: nil, new_role: nil, old_role: nil)
    response = { errors: [] }

    user = User.find_by_email(email)

    if user && full_name
      user.update(
        full_name: full_name
      )
    end

    if new_role && old_role
      RolesUser.find(old_role).destroy!

      user_new_role = RolesUser.create(user_id: user.id, role_id: role)


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
