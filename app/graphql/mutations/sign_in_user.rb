class Mutations::SignInUser < GraphQL::Schema::Mutation
  argument :email, String, required: true
  argument :password, String, required: true

  type Types::UserType

  def resolve(email: nil, password: nil)
    user = User.find_for_database_authentication(email: email)
    session = context[:session]

    unless !session[:current_user_id]
      return GraphQL::ExecutionError.new('Already signed in')
    end

    return GraphQL::ExecutionError.new('User not found') unless user

    unless user.valid_password?(password)
      return GraphQL::ExecutionError.new('Incorrect Email/Password')
    end

    session[:current_user_id] = user.id
    user
  end
end
