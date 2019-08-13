module Mutations
  class UpdateUserPassword < GraphQL::Schema::RelayClassicMutation
    argument :email, String, required: true
    argument :oldPassword, String, required: true
    argument :newPassword, String, required: true

    field :user, Types::UserType, null: true
    field :errors, [Types::FormErrorType], null: false
    field :success, Boolean, null: false

    def resolve(old_password: nil, new_password: nil, email: nil)
      response = { errors: [] }

      if !context[:controller].user_signed_in?
        response[:errors].push({ path: 'root', message: 'Not authorized to do it' })
        response[:success] = false
        return response
      end

      user = User.find_for_database_authentication(email: email)

      unless user && user.valid_password?(old_password)
        response[:errors].push(
          { path: 'root', message: 'Incorrect email or password.' }
        )
        response[:success] = false
        return response
      end

      user = User.
        update({
                 password: password,
                 password_confirmation: password
               })

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
