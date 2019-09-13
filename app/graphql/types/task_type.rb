module Types
  class TaskType < GraphQL::Schema::Object
    description 'Task'

    field :id, String, null: false
    field :name, String, null: true
    field :description, String, null: true
    field :updated_at, String, null: true, method: :last_updated_at
    field :priority, String, null: true
    field :status, String, null: true
    field :due_date, String, null: true
    field :section, TaskSectionType, null: true
    field :isActive, Boolean, null: true
    field :list, ListType, null: true
    field :userOwners, [UserType], null: true
    field :userReviewers, [UserType], null: true
    field :teamOwners, [TeamType], null: true
    field :teamReviewers, [TeamType], null: true
    field :updated_at, String, null: false
    field :taskMessages, [TaskMessage ], null: true

    def section
      object.task_section
    end

    def user_owners
      object.task_owner.where(task_ownerable_type: 'User', owner_type: "Owner").map{|task| task.task_ownerable}
    end

    def team_owners
      object.task_owner.where(task_ownerable_type: 'Team', owner_type: "Owner").map{|task| task.task_ownerable}
    end

    def user_reviewers
      object.task_owner.where(task_ownerable_type: 'User', owner_type: "Reviewer").map{|task| task.task_ownerable}
    end

    def team_reviewers
      object.task_owner.where(task_ownerable_type: 'Team', owner_type: "Reviewer").map{|task| task.task_ownerable}
    end

  end
end
