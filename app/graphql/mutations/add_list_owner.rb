class Mutations::AddListOwner < GraphQL::Schema::Mutation
  argument :listId, ID, required: true
  argument :companyId, ID, required: true
  argument :userEmails, [String], required: false
  argument :teamIds, [ID], required: false

  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(list_id: nil, user_emails: nil, team_ids: nil, company_id: nil)
    response = { errors: [] }

    if user_emails
      user_emails.each do |user_email|
        user = User.find_by_email(user_email)
        if !user
          password = Devise.friendly_token[0, 20]
          user =
            User.create(
              {
                email: user_email,
                password: password,
                password_confirmation: password
              }
            )

          role_id = Role.find_by_name('User').id
          user_role =
            RolesUser.create(
              user_id: user.id, role_id: role_id, company_id: company_id
            )

          user_company =
            UsersCompany.create(user_id: user.id, company_id: company_id)
        end

        list_owner = ListsUser.create(list_id: list_id, user_id: user.id)

        list_owner.errors.messages&.each do |path, messages|
          messages.each do |message|
            response[:errors].push(
              { path: path.to_s.camelcase(:lower), message: message }
            )
            response[:success] = false
          end
        end

      end
    end

    if team_ids
      team_ids.each do |team_id|
        list_owner = ListsUser.create(list_id: list_id, team_id: team_id)

        list_owner.errors.messages&.each do |path, messages|
          messages.each do |message|
            response[:errors].push(
              { path: path.to_s.camelcase(:lower), message: message }
            )
            response[:success] = false
          end
        end

      end
    end

    response[:success] = true

    response
  end
end
