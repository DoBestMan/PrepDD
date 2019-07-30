class Mutations::SignUpUser < GraphQL::Schema::Mutation
  argument :fullName, String, required: true
  argument :email, String, required: true
  argument :password, String, required: true
  argument :companyName, String, required: true
  argument :socialLogin, Boolean, required: true
  argument :tokenID, String, required: true
  argument :provider, String, required: true
  argument :uuID, String, required: true

  field :user, Types::UserType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(full_name: nil, email: nil, password: nil, company_name: nil, social_login: nil,
              token_id: nil, provider: nil, uu_id: nil)
    response = { errors: [] }

    if context[:controller].user_signed_in?
      response[:errors].push({ path: 'root', message: 'Already signed in.' })
      response[:success] = false
      return response
    end

    user =
      User.create(
        {
          full_name: full_name,
          email: email,
          password: password,
          password_confirmation: password,
          token_id: token_id,
          social_login_provider: provider,
          uuid: uu_id
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

    if user.valid? && company_name.present?
      company = user.owned_companies.create({ name: company_name })

      company.errors.messages.each do |path, messages|
        messages.each do |message|
          response[:errors].push(
            { path: path.to_s.camelcase(:lower), message: message }
          )
          response[:success] = false
        end
      end
    end

    if user.persisted?
      context[:controller].sign_in(user)
      response[:user] = user
      response[:current_user] = { id: 'current_user', user: user }
      response[:success] = true
      response
    end

    response
  end
end
