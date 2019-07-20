module Mutations
  class UpdateUserDetails < GraphQL::Schema::RelayClassicMutation
    argument :fullName, String, required: true
    argument :email, String, required: true
    argument :companyName, String, required: true

    field :user, Types::UserType, null: true
    field :errors, [Types::FormErrorType], null: false
    field :success, Boolean, null: false

    def resolve(full_name: nil, email: nil, company_name: nil)
      response = { errors: [] }

      user =
        User.update(
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