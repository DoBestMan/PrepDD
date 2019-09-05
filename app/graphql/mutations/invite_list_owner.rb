class Mutations::InviteListOwner < GraphQL::Schema::Mutation
  argument :listId, ID, required: true
  argument :companyID, String, required: true
  argument :userName, String, required: true
  argument :userEmail, String, required: true

  field :user, Types::UserType, null: false
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(user_name: nil, user_email: nil, company_id: nil, list_id: nil)
    response = { errors: [] }

    if user_email
      password = Devise.friendly_token[0, 20]
      user =
        User.create(
          {
            full_name: user_name,
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

      list_owner = ListsUser.create(list_id: list_id, user_id: user.id)
    end

    if user&.persisted?
      response[:success] = true
      response[:user] = user
      response
    end

    response
  end
end
