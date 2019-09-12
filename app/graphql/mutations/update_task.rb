class Mutations::UpdateTask < GraphQL::Schema::Mutation
  argument :id, ID, required: true
  argument :name, String, required: false
  argument :description, String, required: false
  argument :priority, String, required: false
  argument :status, String, required: false
  argument :dueDate, String, required: false

  field :task, Types::TaskType, null: false
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(id: nil, name: nil, description: nil, priority: nil, status: nil, due_date: nil)

    response = { errors: [] }

    task = Task.find(id)

    if name.present?
      task.update(name: name)
    end

    if description.present?
      task.update(description: description)
    end

    if priority.present?
      task.update(priority: priority)
    end

    if status.present?
      task.update(status: status)
    end

    if due_date.present?
      task.update(due_date: due_date)
    end

    if task&.persisted?
      response[:success] = true
      response[:task] = task
    end

    response
  end
end
