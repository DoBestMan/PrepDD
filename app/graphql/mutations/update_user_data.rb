class Mutations::UpdateUserData < GraphQL::Schema::Mutation
  argument :fullName, String, required: true
  argument :email, String, required: true
  argument :displayName, String, required: true
  argument :lastViewedCompanyId, ID, required: false

  field :user, Types::UserType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(
    full_name: nil, email: nil, display_name: nil, last_viewed_company_id: nil
  )
    response = { errors: [] }

    user = context[:controller].current_user

    user.update(
      {
        full_name: full_name,
        email: email,
        display_name: display_name,
        last_viewed_company_id: last_viewed_company_id
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
