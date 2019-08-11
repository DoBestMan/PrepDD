module Mutations
  class UpdateUserDetails < GraphQL::Schema::RelayClassicMutation
    argument :fullName, String, required: true
    argument :email, String, required: true

    field :user, Types::UserType, null: true
    field :errors, [Types::FormErrorType], null: false
    field :success, Boolean, null: false

    def resolve(full_name: nil, email: nil)
      response = { errors: [] }

      if !context[:controller].user_signed_in?
        response[:errors].push({ path: 'root', message: 'Not authorized to do it' })
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

      user =
        User.update(
          {
            full_name: full_name,
            email: email,
            password: new_password,
            password_confirmation: new_password
          }
        )

      user.errors.messages.each do |path, messages|
        messages.each do |message|
          response[:errors].push(
            { path: path.to_s.camelcase(:lower), message: message }
          )
          response[:success] = false
        end
      end

      if user.persisted?
        response[:user] = user
        response[:success] = true
      end

      response
    end
  end
end
