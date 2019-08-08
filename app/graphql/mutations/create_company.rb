class Mutations::CreateCompany < GraphQL::Schema::Mutation
  argument :name, String, required: true

  field :company, Types::CompanyType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(name: nil)
    response = { errors: [] }

    if context[:controller].user_signed_in?
      company = Company.create({ name: name, owner_id: context[:controller].current_user.id })
    else
      company = Company.create({ name: name })
    end

    company.errors.messages.each do |path, messages|
      messages.each do |message|
        response[:errors].push(
          { path: path.to_s.camelcase(:lower), message: message }
        )
        response[:success] = false
      end
    end

    if company&.persisted?
      response[:success] = true
      response
    end

    response
  end
end
