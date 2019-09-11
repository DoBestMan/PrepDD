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
    field :tasks, [TaskType], null: true
    field :owners, [UserType], null: true
    field :sections, [TaskSectionType], null: true
    field :requester_rank, Integer, null: true
    field :responder_rank, Integer, null: true

    def requester_company
      object.requester
    end

    def responder_company
      object.responder
    end

    def sections
      sections = object.tasks.includes(:task_section).map{|task| task.task_section&.id}
      TaskSection.where(id: sections)
    end
  end
end
