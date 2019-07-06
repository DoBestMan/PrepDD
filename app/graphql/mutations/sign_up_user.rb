class Mutations::SignUpUser < GraphQL::Schema::Mutation
  argument :firstName, String, required: true
  argument :lastName, String, required: true
  argument :email, String, required: true
  argument :password, String, required: true

  field :user, Types::UserType, null: true
  field :errors, [Types::UserError], null: false

  def resolve(first_name: nil, last_name: nil, email: nil, password: nil)
    response = { user: nil, errors: [] }

    if context[:controller].user_signed_in?
      response[:errors].push({ path: [], message: 'Already signed in.' })
      return response
    end

    user =
      User.create(
        {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          password_confirmation: password
        }
      )

    user.errors.messages.each do |path, messages|
      messages.each do |message|
        response[:errors].push(
          { path: path.to_s.camelcase(:lower), message: message }
        )
      end
    end

    response[:user] = user
    response
  end
end
