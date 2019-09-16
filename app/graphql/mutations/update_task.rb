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

  def resolve(
    id: nil,
    name: nil,
    description: nil,
    priority: nil,
    status: nil,
    due_date: nil
  )
    response = { errors: [] }

    task = Task.find(id)

    task.update(name: name) if name.present?

    task.update(description: description) if description.present?

    task.update(priority: priority) if priority.present?

    task.update(status: status) if status.present?

    task.update(due_date: due_date) if due_date.present?

    if task&.persisted?
      response[:success] = true
      response[:task] = task
    end

    response
  end
end
