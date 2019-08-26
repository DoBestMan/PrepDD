module Types
  class RolesUserType < GraphQL::Schema::Object
    description 'All Available Roles of User'

    field :id, ID, null: false
    field :name, String, null: false
    field :companyId, ID, null: false

    def id
      object.role.id
    end

    def name
      object.role.name
      end

    def name
      object.role.name
    end

    def company_id
      object.company_id
    end
  end
end
