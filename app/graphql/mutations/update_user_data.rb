class Mutations::UpdateUserData < GraphQL::Schema::Mutation
  argument :fullName, String, required: true
  argument :email, String, required: true
  argument :displayName, String, required: true

  field :user, Types::UserType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(full_name: nil, email: nil)
    response = { errors: [] }

    user =

    user.update(
        {
          full_name: full_name,
          email: email,
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
      response[:success] = true
      response
    end

    response
  end
end
