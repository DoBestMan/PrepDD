class Mutations::UpdateUserPassword < GraphQL::Schema::Mutation
  argument :password, String, required: true

  field :user, Types::UserType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(password: nil)
    response = { errors: [] }

    if !context[:controller].user_signed_in?
      response[:errors].push({ path: 'root', message: 'Not authorized to do it' })
      response[:success] = false
      return response
    end

    user = context[:controller].current_user

    user.
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