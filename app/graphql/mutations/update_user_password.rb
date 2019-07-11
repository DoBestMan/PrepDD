module Mutations
  class UpdateUserPassword < GraphQL::Schema::RelayClassicMutation
    argument :password, String, required: true
    argument :confirmPassword, String, required: true

    field :user, Types::UserType, null: true
    field :errors, [Types::FormErrorType], null: false
    field :success, Boolean, null: false

    def resolve(password: nil, confirm_password: nil)
      response = { errors: [] }

      user =
          User.update(
              {
                  password: password,
                  password_confirmation: password
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
