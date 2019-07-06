class Mutations::SignInUser < GraphQL::Schema::Mutation
  argument :email, String, required: true
  argument :password, String, required: true

  field :user, Types::UserType, null: true
  field :errors, [Types::UserError], null: false

  def resolve(email: nil, password: nil)
    response = { user: nil, errors: [] }

    if context[:controller].user_signed_in?
      response[:errors].push({ path: '', message: 'Already signed in.' })
      return response
    end

    user = User.find_for_database_authentication(email: email)

    unless user && user.valid_password?(password)
      response[:errors].push(
        { path: '', message: 'Incorrect email or password.' }
      )
      return response
    end

    context[:controller].sign_in(user)
    response[:user] = user
    response
  end
end
