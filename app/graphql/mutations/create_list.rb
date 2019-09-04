class Mutations::CreateList < GraphQL::Schema::Mutation
  argument :name, String, required: true
  argument :description, String, required: false
  argument :ownerId, ID, required: true
  argument :requesterId, ID, required: true
  argument :responderId, ID, required: false
  argument :isTemplate, Boolean, required: true
  argument :isPublicTemplate, Boolean, required: true
  argument :tasks, [Types::TaskAttributes ], required: false

  field :list, Types::ListType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(name: nil, description: nil, requester_id: nil, responder_id: nil, is_template: nil,
              is_public_template: nil, owner_id: nil, tasks: nil)
    response = { errors: [] }

    list = List.create(name: name, description: description, requester_id: requester_id,
                       responder_id: responder_id, is_template: is_template,
                       is_public_template: is_template
    )

    if list
      ListsUser.create(list_id: list.id, user_id: owner_id)
    end

    if list && tasks
      tasks.each do |task|
        if task.section.present?
          task_section = TaskSection.where(name: task.section).first_or_create
          list.tasks.create(name: task.name, description: task.description, priority: task.priority,
                            task_section_id: task_section&.id )
        else
          list.tasks.create(name: task.name, description: task.description, priority: task.priority)
        end
      end
    end

    list.errors.messages.each do |path, messages|
      messages.each do |message|
        response[:errors].push(
          { path: path.to_s.camelcase(:lower), message: message }
        )
        response[:success] = false
      end
    end

    if list&.persisted?
      response[:list] = list
      response[:success] = true
    end

    response
  end
end
