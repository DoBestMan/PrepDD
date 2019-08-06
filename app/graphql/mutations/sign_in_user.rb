class Mutations::SignInUser < GraphQL::Schema::Mutation
  argument :email, String, required: true
  argument :password, String, required: true
  argument :socialLogin, Boolean, required: true
  argument :tokenID, String, required: true
  argument :provider, String, required: true
  argument :uuID, String, required: true

  field :current_user, Types::CurrentUserType, null: true
  field :user, Types::UserType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(email: nil, password: nil, social_login: nil, token_id: nil, provider: nil, uu_id: nil)
    response = { errors: [] }

    if context[:controller].user_signed_in?
      response[:errors].push({ path: 'root', message: 'Already signed in.' })
      response[:success] = false
      return response
    end

    if social_login.present? && token_id
      if provider == 'linkedIn'
        profile = User.linkedin_auth(token_id)
        uu_id = profile["id"]
      end
      user = User.find_by_uuid(uu_id)
      user&.update(token_id: token_id)

      unless user
        response[:errors].push(
          { path: 'root', message: 'Account not found, please sign up.' }
        )
        response[:success] = false
        return response
      end
    else
      user = User.find_for_database_authentication(email: email)

      unless user && user.valid_password?(password)
        response[:errors].push(
          { path: 'root', message: 'Incorrect email or password.' }
        )
        response[:success] = false
        return response
      end
    end

    context[:controller].sign_in(user)
    response[:user] = user
    response[:current_user] = { id: 'current_user', user: user }
    response[:success] = true
    response
  end
end
