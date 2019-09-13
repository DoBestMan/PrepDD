class Mutations::CreateList < GraphQL::Schema::Mutation
  argument :name, String, required: true
  argument :description, String, required: false
  argument :requesterId, ID, required: false
  argument :responderId, ID, required: false
  argument :tasks, [Types::TaskAttributes], required: false

  field :list, Types::ListType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(
    name: nil,
    description: nil,
    requester_id: nil,
    responder_id: nil,
    tasks: nil
  )
    response = { errors: [] }

    list =
      List.create(
        name: name,
        description: description,
        requester_id: requester_id,
        responder_id: responder_id,
        is_template: false,
        is_public_template: false
      )

    if list && tasks
      tasks.each do |task|
      # We want to set the list_number as the id of the last task in the list 
      # plus one 
      list_number = list.tasks.any? ? list.tasks.last.list_number + 1 : 1
        if task.section.present?
          task_section = TaskSection.where(name: task.section).first_or_create
          list.tasks.create(
            name: task.name,
            description: task.description,
            priority: task.priority,
            task_section_id: task_section&.id,
            list_number: list_number
          )
        else
          list.tasks.create(
            name: task.name,
            description: task.description,
            priority: task.priority,
            list_number: list_number
          )
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
