class Mutations::UpdateCompanySettings < GraphQL::Schema::Mutation
  argument :id, ID, required: true
  argument :name, String, required: false
  argument :parentID, ID, required: false
  argument :brokerID, ID, required: false
  argument :automaticPdf, Boolean, required: false
  argument :dynamicWatermarking, Boolean, required: false
  argument :previewOnly, Boolean, required: false

  field :company, Types::CompanyType, null: false
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
    
    if company&.persisted?
      response[:success] = true
      response[:companies] = company
      response
    end

    response
  end
end
