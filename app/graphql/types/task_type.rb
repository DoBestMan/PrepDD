module Types
  class TaskType < GraphQL::Schema::Object
    description 'Task'

    field :id, String, null: false
    field :name, String, null: true
    field :description, String, null: true
    field :priority, String, null: true
    field :status, String, null: true
    field :due_date, String, null: true
    field :section, TaskSectionType, null: true
    field :isActive, Boolean, null: true
    field :list, ListType, null: true

    def section
      object.task_section
    end
  end
end
