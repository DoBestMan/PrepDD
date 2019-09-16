class Mutations::CreateTaskMessages < GraphQL::Schema::Mutation
  argument :taskId, ID, required: true
  argument :userId, ID, required: false 
  argument :message, String, required: true

  # is public is optional, and should default to nil. You only 
  # send a public message when you explicity want to.
  argument :is_public, Boolean, required: false 

  field :message, Types::TaskMessageType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(task_id: nil, user_id: nil, message: nil, is_public: nil)
    response = { errors: [] }

    # We want to always infer the current user as the creator of the message
    # there shouldn't be a case where a user is posting a message as another user
    user_id = context[:controller].current_user.id

    task_message = TaskMessage.create(task_id: task_id, user_id: user_id, message: message, is_public: is_public)

    # For internal tasks, we want to use the user's current company to restrict
    # access. 
    if !is_public 
      task_message.update(company_id: context[:controller].current_user.last_viewed_company_id)
    end

    task_message.errors.messages.each do |path, messages|
      messages.each do |message|
        response[:errors].push(
          { path: path.to_s.camelcase(:lower), message: message }
        )
        response[:success] = false
      end
    end

    if task_message&.persisted?
      response[:message] = task_message
      response[:success] = true
    end
    response
  end
end
