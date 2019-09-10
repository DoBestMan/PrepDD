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
    field :user_owners, [UserType], null: true
    field :reviewers, [UserType], null: true
    field :team_owners, [TaskType], null: true

    def section
      object.task_section
    end

    def user_owners
      object.task_owner.where(task_ownerable_type: 'User', owner_type: "Owner").map{|task| task.task_ownerable}
    end

    def team_owners
      object.task_owner.where(task_ownerable_type: 'Team', owner_type: "Owner").map{|task| task.task_ownerable}
    end

    def reviewers
      object.task_owner.where(task_ownerable_type: 'User', owner_type: "Reviewer").map{|task| task.task_ownerable}
    end

  end
end
