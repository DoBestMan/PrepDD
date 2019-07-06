class Mutations::SignOutUser < GraphQL::Schema::Mutation
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(email: nil, password: nil)
    response = { errors: [] }

    unless context[:controller].user_signed_in?
      response[:errors].push({ path: 'root', message: 'Already signed out.' })
      response[:success] = false
      return response
    end

    context[:controller].sign_out
    response[:success] = true
    response
  end
end
