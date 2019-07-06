class Mutations::SignUpUser < GraphQL::Schema::Mutation
  argument :fullName, String, required: true
  argument :email, String, required: true
  argument :password, String, required: true

  field :user, Types::UserType, null: true
  field :errors, [Types::UserError], null: false

  def resolve(full_name: nil, email: nil, password: nil)
    response = { user: nil, errors: [] }

    if context[:controller].user_signed_in?
      response[:errors].push({ path: [], message: 'Already signed in.' })
      return response
    end

    user =
      User.create(
        {
          full_name: full_name,
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
