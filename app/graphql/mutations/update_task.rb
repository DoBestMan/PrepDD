class Mutations::UpdateTask < GraphQL::Schema::Mutation
  argument :id, ID, required: true
  argument :name, String, required: false
  argument :description, String, required: false
  argument :priority, String, required: false
  argument :status, String, required: false
  argument :dueDate, String, required: false

  argument :userOwners, [String], required: false
  argument :userReviewers, [String], required: false
  argument :teamOwners, [ID], required: false
  argument :teamReviewers, [ID], required: false

  field :task, Types::TaskType, null: false
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(id: nil, name: nil, description: nil, priority: nil, status: nil, due_date: nil,
              user_owners: nil, user_reviewers:nil, team_owners: nil, team_reviewers: nil)

    response = { errors: [] }

    task = Task.find(id)
    task.update(
      {
        name: name,
        description: description,
        priority: priority,
        status: status,
        due_date: due_date
      }
    )

    if user_owners.present?
      user_owners.each do |email|
        user = User.find_by_email(email)
        if !user
          password = Devise.friendly_token[0, 20]
          user =
            User.create(
              {
                email: email,
                password: password,
                password_confirmation: password
              }
            )

          role_id = Role.find_by_name('User').id
          company_id = context[:controller].current_user.last_viewed_company_id
          user_role =
            RolesUser.create(
              user_id: user.id, role_id: role_id, company_id: company_id
            )

          user_company =
            UsersCompany.create(user_id: user.id, company_id: company_id)
        end

        user.task_owners.create(task_id: task.id, owner_type: 'Owner')
      end
    end

    if user_reviewers.present?
      user_reviewers.each do |email|
        user = User.find_by_email(email)
        if !user
          password = Devise.friendly_token[0, 20]
          user =
            User.create(
              {
                email: email,
                password: password,
                password_confirmation: password
              }
            )

          role_id = Role.find_by_name('User').id
          company_id = context[:controller].current_user.last_viewed_company_id
          user_role =
            RolesUser.create(
              user_id: user.id, role_id: role_id, company_id: company_id
            )

          user_company =
            UsersCompany.create(user_id: user.id, company_id: company_id)
        end

        user.task_owners.create(task_id: task.id, owner_type: 'Reviewer')
      end
    end

    if team_owners
      team_owners.each do |id|
        team = Team.find(id)
        task_owners.create(task_id: task.id, owner_type: 'Owner')
      end
    end

    if team_reviewers
      team_owners.each do |id|
        team = Team.find(id)
        task_owners.create(task_id: task.id, owner_type: 'Reviewer')
      end
    end

    if task&.persisted?
      response[:success] = true
      response[:task] = task
    end

    response
  end
end
