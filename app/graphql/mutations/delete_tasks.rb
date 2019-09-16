class Mutations::DeleteTasks < GraphQL::Schema::Mutation
  argument :taskIds, [ID], required: true

  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false
  field :task_ids, [ID], null: false

  def resolve(task_ids: nil)
    response = { errors: [] }

    task_ids.each { |id| Task.find(id).destroy! }

    response[:success] = true
    # returning task ids to update the DOM
    response[:task_ids] = task_ids
    response
  end
end
