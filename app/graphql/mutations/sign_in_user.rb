class Mutations::SignInUser < GraphQL::Schema::Mutation
  argument :email, String, required: true
  argument :password, String, required: true

  type Types::UserType

  def resolve(email: nil, password: nil)
    user = User.find_for_database_authentication(email: email)

    unless user 
      return GraphQL::ExecutionError.new('User not found') 
    end

    unless user.valid_password?(password)
      return GraphQL::ExecutionError.new('Incorrect Email/Password')
    end

    user
  end
end
