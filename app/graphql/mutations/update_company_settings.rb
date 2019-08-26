class Mutations::UpdateCompanySettings < GraphQL::Schema::Mutation
  argument :id, ID, required: true
  argument :name, String, required: false
  argument :parentID, ID, required: false
  argument :brokerID, ID, required: false
  argument :automaticPdf, Boolean, required: false
  argument :dynamicWatermarking, Boolean, required: false
  argument :previewOnly, Boolean, required: false

  field :company, Types::CompanyType, null: false
  field :parents, [Types::CompanyType], null: true
  field :brokers, [Types::CompanyType], null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(id: nil, name: nil, parent_id: nil, broker_id: nil, automatic_pdf: nil,
              dynamic_watermarking: nil, preview_only: nil)

    response = { errors: [] }
    company = Company.find(id)

    company&.update(
             name: name,
             automatic_pdf: automatic_pdf,
             preview_only: preview_only,
             dynamic_watermarking: dynamic_watermarking
    )

    if parent_id.present?
      ParentCompany(child_company_id: company&.id, parent_company_id: parent_id)
    end

    if broker_id.present?
      BrokerCompany.create(child_broker_id: company&.id, parent_broker_id: broker_id)
    end

    parents = company.company_parents
    brokers = company.broker_parents

    if company&.persisted?
      response[:success] = true
      response[:company] = company
      response[:parents] = parents
      response[:brokers] = brokers
      response
    end

    response
  end
end
