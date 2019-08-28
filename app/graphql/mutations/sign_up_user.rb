class Mutations::SignUpUser < GraphQL::Schema::Mutation
  argument :fullName, String, required: true
  argument :email, String, required: true
  argument :password, String, required: true
  argument :companyName, String, required: false
  argument :socialLogin, Boolean, required: false
  argument :tokenID, String, required: false
  argument :provider, String, required: false
  argument :uuID, String, required: false

  field :user, Types::UserType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(
    full_name: nil,
    email: nil,
    password: nil,
    company_name: nil,
    social_login: nil,
    token_id: nil,
    provider: nil,
    uu_id: nil
  )
    response = { errors: [] }

    if context[:controller].user_signed_in?
      response[:errors].push({ path: 'root', message: 'Already signed in.' })
      response[:success] = false
      return response
    end

    if social_login
      if provider == 'linkedIn'
        profile = User.linkedin_auth(token_id)
        if profile
          full_name = profile["localizedFirstName"] + " " + profile["localizedLastName"]
          uu_id = profile['id']
          email = uu_id + '@linkedin.com'
        else
          response[:errors].push(
            { path: 'root', message: 'Could not use your LinkedIn account.' }
          )
          response[:success] = false
          return response
        end
      end
      password = Devise.friendly_token[0, 20]
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
      company = Company.find_by_name(company_name)
      company&.owner = user
      company&.save!

      owner_id = Role.find_by_name('Owner').id
      user_role =
        RolesUser.create(
          user_id: user.id, role_id: owner_id, company_id: company.id
        )

      company&.errors.messages.each do |path, messages|
        messages.each do |message|
          response[:errors].push(
            { path: path.to_s.camelcase(:lower), message: message }
          )
          response[:success] = false
        end
      end

      user_role.errors.messages.each do |path, messages|
        messages.each do |message|
          response[:errors].push(
            { path: path.to_s.camelcase(:lower), message: message }
          )
          response[:success] = false
        end
      end

      user_company =
        UsersCompany.create(user_id: user.id, company_id: company.id)

      user_company.errors.messages.each do |path, messages|
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
