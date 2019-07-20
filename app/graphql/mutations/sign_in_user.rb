class Mutations::SignInUser < GraphQL::Schema::Mutation
  argument :email, String, required: true
  argument :password, String, required: true

  field :current_user, Types::CurrentUserType, null: true
  field :user, Types::UserType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(email: nil, password: nil)
    response = { errors: [] }

    if context[:controller].user_signed_in?
      response[:errors].push({ path: 'root', message: 'Already signed in.' })
      response[:success] = false
      return response
    end

    user = User.find_for_database_authentication(email: email)

    unless user && user.valid_password?(password)
      response[:errors].push(
        { path: 'root', message: 'Incorrect email or password.' }
      )
      response[:success] = false
      return response
    end

    context[:controller].sign_in(user)
    response[:user] = user
    response[:current_user] = { id: 'current_user', user: user }
    response[:success] = true
    response
  end
end
