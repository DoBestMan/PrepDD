class Mutations::DeleteTask < GraphQL::Schema::Mutation
  argument :taskIds, [ID], required: true

  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(task_ids: nil)
    response = { errors: [] }

    task_ids.each do |id|
      Task.find(id).destroy!
    end

    response[:success] = true
    response
  end
end
