class Mutations::RemoveTaskOwners < GraphQL::Schema::Mutation
  argument :taskID, ID, required: true
  argument :userOwners, [String], required: false
  argument :userReviewers, [String], required: false
  argument :teamOwners, [ID], required: false
  argument :teamReviewers, [ID], required: false

  field :task, Types::TaskType, null: false
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(task_id: nil, user_owners: nil, user_reviewers:nil, team_owners: nil, team_reviewers: nil)

    response = { errors: [] }

    task = Task.find(task_id)

    if user_owners.present?
      user_owners.each do |email|
        user = User.find_by_email(email)
        TaskOwner.where(task_id: task_id, task_ownerable_id: user&.id,  task_ownerable_type: "User").first.destroy!
      end
    end

    if user_reviewers.present?
      user_reviewers.each do |email|
        user = User.find_by_email(email)
        TaskOwner.where(task_id: task_id, task_ownerable_id: user&.id,  task_ownerable_type: "User").first.destroy!
      end
    end

    if team_owners
      team_owners.each do |id|
        TaskOwner.where(task_id: task_id, task_ownerable_id: id,  task_ownerable_type: "Team").first.destroy!
      end
    end

    if team_reviewers
      team_owners.each do |id|
        TaskOwner.where(task_id: task_id, task_ownerable_id: id,  task_ownerable_type: "Team").first.destroy!
      end
    end

    response[:success] = true
    response[:task] = task
    response
  end

end

