class Mutations::InviteNewCompanyToList < GraphQL::Schema::Mutation
  argument :companyId, ID, required: true
  argument :listId, ID, required: true
  argument :ownerEmail, String, required: true
  argument :newCompanyName, String, required: true
  argument :isRequest, Boolean, required: false
  argument :isShare, Boolean, required: false

  field :company, Types::CompanyType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(
    company_id: nil,
    list_id: nil,
    owner_email: nil,
    new_company_name: nil,
    is_request: nil,
    is_share: nil
  )
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
      new_company = Company.create(name: new_company_name)
      UsersCompany.create(user_id: user.id, company_id: new_company.id)
      owner_id = Role.find_by_name('Owner').id
      RolesUser.create(
        user_id: user.id, role_id: owner_id, company_id: new_company.id
      )
    end

    list = List.find(list_id)
    if is_share
      list.update(requester_id: new_company.id, responder_id: company_id)
    elsif is_request
      list.update(requester_id: company_id, responder_id: new_company.id)
    end

    new_company.errors.messages.each do |path, messages|
      messages.each do |message|
        response[:errors].push(
          { path: path.to_s.camelcase(:lower), message: message }
        )
        response[:success] = false
      end
    end

    if user&.persisted? && new_company&.persisted?
      response[:company] = new_company
      response[:success] = true
    end

    response
  end
end
