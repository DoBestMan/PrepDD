class Mutations::SendResetPasswordInstructions < GraphQL::Schema::Mutation
  argument :email, String, required: true

  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(email: nil)
    response = { errors: [] }

    if context[:controller].user_signed_in?
      response[:errors].push({ path: 'root', message: 'Already signed in.' })
      response[:success] = false
      return response
    end

    user = User.find_for_database_authentication(email: email)

    unless user
      response[:errors].push({ path: 'email', message: 'Unrecognized email.' })
      response[:success] = false
      return response
    end

    user.send_reset_password_instructions

    response[:success] = true
    response
  end
end
