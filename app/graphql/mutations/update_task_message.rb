class Mutations::UpdateTaskMessage < GraphQL::Schema::Mutation
  argument :id, ID, required: true
  argument :message, String, required: true

  field :taskMessage, Types::TaskMessageType, null: false
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(id: nil, message: nil)

    response = { errors: [] }

    task_message = TaskMessage.find(id)

    task_message.update(message: message)

    if task_message&.persisted?
      response[:success] = true
      response[:task_message] = task_message
    end
    response
  end

end