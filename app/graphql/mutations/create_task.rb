class Mutations::CreateTask < GraphQL::Schema::Mutation
  argument :name, String, required: true
  argument :description, String, required: false
  argument :listId, ID, required: true
  argument :priority, String, required: true
  argument :status, String, required: true
  argument :section, String, required: false

  field :task, Types::TaskType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(name: nil, description: nil, list_id: nil, priority: nil, status: nil, section: nil)
    response = { errors: [] }

    task = Task.create(name: name, description: description, list_id: list_id,
                       status: status, priority: priority, section: section
    )

    task.errors.messages.each do |path, messages|
      messages.each do |message|
        response[:errors].push(
          { path: path.to_s.camelcase(:lower), message: message }
        )
        response[:success] = false
      end
    end

    if list&.persisted?
      response[:task] = task
      response[:success] = true
    end

    response
  end
end
