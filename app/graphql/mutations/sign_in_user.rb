class Mutations::SignInUser < GraphQL::Schema::Mutation
  argument :email, String, required: true
  argument :password, String, required: true

  field :user, Types::UserType, null: false

  def resolve(email: nil, password: nil)
    user = User.find_for_database_authentication(email: email)

    if context[:controller].user_signed_in?
      return GraphQL::ExecutionError.new('Already signed in.')
    end

    unless user && user.valid_password?(password)
      return GraphQL::ExecutionError.new('Incorrect email or password.')
    end

    context[:controller].sign_in(user)
    { user: user }
  end
end
