class Mutations::UpdateCompany < GraphQL::Schema::Mutation
  argument :id, ID, required: true
  argument :name, String, required: true
  argument :autoPdf, Boolean, required: true
  argument :autoWatermark, Boolean, required: true
  argument :previewOnly, Boolean, required: true

  field :company, Types::CompanyType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(id: nil, name: nil, auto_pdf: nil, auto_watermark: nil, preview_only: nil)
    response = { errors: [] }

    if !context[:controller].user_signed_in?
      response[:errors].push({ path: 'root', message: 'Not authorized to do it' })
      response[:success] = false
      return response
    end

    company = Company.find(id)
    company&.update(
      {
        name: name,
        auto_pdf: auto_pdf,
        auto_watermark: auto_watermark,
        preview_only: preview_only,
      }
    )

    company&.errors.messages.each do |path, messages|
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