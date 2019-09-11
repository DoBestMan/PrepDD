class Mutations::UpdateTask < GraphQL::Schema::Mutation
  argument :id, ID, required: true
  argument :name, String, required: false
  argument :description, String, required: false
  argument :priority, String, required: false


  field :task, Types::TaskType, null: false
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(id: nil, name: nil, description: nil, priority: nil)
    response = { errors: [] }

    task = Task.find(id)
    
    if task&.persisted?
      response[:success] = true
      response[:task] = task
    end

    response
  end
end
