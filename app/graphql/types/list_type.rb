module Types
  class ListType < GraphQL::Schema::Object
    description 'Lists'

    field :id, String, null: false
    field :name, String, null: true
    field :description, String, null: true
    field :isActive, Boolean, null: true
    field :isTemplate, Boolean, null: true
    field :isPublicTemplate, Boolean, null: true
    field :requesterCompany, CompanyType, null: true
    field :responderCompany, CompanyType, null: true

    def requester_company
      object.requester
    end

    def responder_company
      object.responder
    end
  end
end
