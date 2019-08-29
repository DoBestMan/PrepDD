class Mutations::CreateAssociatedCompany < GraphQL::Schema::Mutation
  argument :companyId, ID, required: true
  argument :ownerEmail, String, required: true
  argument :newCompanyName, String, required: true
  argument :isParent, Boolean, required: false
  argument :isBroker, Boolean, required: false

  field :company, Types::CompanyType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(company_id: nil, owner_email: nil, new_company_name: nil, is_parent: nil, is_broker: nil)
    response = { errors: [] }

    password = Devise.friendly_token[0, 20]

    user =
      User.create(
        {
          email: owner_email,
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
      company = Company.create(name: new_company_name)
      UsersCompany.create(user_id: user.id, company_id: company.id)
      owner_id = Role.find_by_name('Owner').id
      RolesUser.create(user_id: user.id, role_id: owner_id, company_id: company.id)
    end

    if is_broker
      BrokerCompany.create(child_broker_id: company_id, parent_broker_id: company.id)
    elsif is_parent
      ParentCompany.create(child_company_id: company_id, parent_company_id: company.id)
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
      response[:company] = company
      response[:success] = true
    end

    response
  end
end
