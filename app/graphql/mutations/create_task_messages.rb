class Mutations::CreateTaskMessages < GraphQL::Schema::Mutation
  argument :taskId, ID, required: true
  argument :userId, ID, required: true
  argument :message, String, required: true

  field :message, Types::TaskMessageType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(task_id: nil, user_id: nil, message: nil)
    response = { errors: [] }

    task_message = TaskMessage.create(task_id: task_id, user_id: user_id, message: message)

    task_message.errors.messages.each do |path, messages|
      messages.each do |message|
        response[:errors].push(
          { path: path.to_s.camelcase(:lower), message: message }
        )
        response[:success] = false
      end
    end

    if task_message&.persisted?
      response[:success] = true
    end
    response
  end
end
