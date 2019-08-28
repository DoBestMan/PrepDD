class Mutations::CreateAssociatedCompany < GraphQL::Schema::Mutation
  argument :companyName, String, required: true
  argument :userName, String, required: true
  argument :userEmail, String, required: true

  field :company, Types::CompanyType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(company_name: nil, user_name: nil, user_email: nil)
    response = { errors: [] }

    password = Devise.friendly_token[0,20]

    user =
      User.create(
        {
          full_name: user_name,
          email: user_email,
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

    if user
      company = user.companies.create(name: company_name)
      user_company = UsersCompany.create(user_id: user.id, company_id: company.id)
      owner_id = Role.find_by_name('Owner').id
      user_role = RolesUser.create(user_id: user.id, role_id: owner_id, company_id: company.id)
    end


    company.errors.messages.each do |path, messages|
      messages.each do |message|
        response[:errors].push(
          { path: path.to_s.camelcase(:lower), message: message }
        )
        response[:success] = false
      end
    end

    if user&.persisted? && company&.persisted?
      response[:success] = true
      response
    end

    response
  end
end
