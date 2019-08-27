class Mutations::UpdateCompanySettings < GraphQL::Schema::Mutation
  argument :id, ID, required: true
  argument :name, String, required: false
  argument :parentName, String, required: false
  argument :brokerName, String, required: false
  argument :automaticPdf, Boolean, required: false
  argument :dynamicWatermarking, Boolean, required: false
  argument :previewOnly, Boolean, required: false

  argument :deleteParentId, ID, required: false
  argument :deleteBrokerId, ID, required: false

  field :company, Types::CompanyType, null: false
  field :parents, [Types::CompanyType], null: true
  field :brokers, [Types::CompanyType], null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(
    id: nil,
    name: nil,
    parent_name: nil,
    broker_name: nil,
    automatic_pdf: nil,
    dynamic_watermarking: nil,
    preview_only: nil,
    delete_broker_id: nil,
    delete_parent_id: nil
  )
    response = { errors: [] }
    company = Company.find(id)

    company&.update(
      name: name,
      auto_pdf: automatic_pdf,
      preview_only: preview_only,
      auto_watermark: dynamic_watermarking
    )

    if parent_name.present?
      parent = Company.find_by_name(parent_name)
      if parent
        ParentCompany.create(
          child_company_id: company&.id, parent_company_id: parent.id
        )
      else
        #ToDo Create Parent Company & User
      end
    end

    if broker_name.present?
      broker = Company.find_by_name(broker_name)
      if broker
        BrokerCompany.create(
          child_broker_id: company&.id, parent_broker_id: broker.id
        )
      else
        #ToDo Create Broker Company & User
      end
    end

    if delete_parent_id.present?
      ParentCompany.where(child_company_id: company&.id, parent_company_id: delete_parent_id).first&.destroy!
    end

    if delete_broker_id.present?
      BrokerCompany.where(child_broker_id: company&.id, parent_broker_id: delete_broker_id).first&.destroy!
    end

    parents = company.company_parents
    brokers = company.broker_parents

    if company&.persisted?
      response[:success] = true
      response[:company] = company
      response[:parents] = parents
      response[:brokers] = brokers
    end

    response
  end
end
