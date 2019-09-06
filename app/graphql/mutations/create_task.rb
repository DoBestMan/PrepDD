class Mutations::CreateTask < GraphQL::Schema::Mutation
  argument :listId, ID, required: true
  argument :tasks, [Types::TaskAttributes], required: true

  field :task, Types::TaskType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(list_id: nil, tasks: nil)
    response = { errors: [] }

    list = List.find(list_id)

    tasks.each do |task|
      if task.section.present?
        task_section = TaskSection.where(name: task.section).first_or_create
        list.tasks.create(
          name: task.name,
          description: task.description,
          priority: task.priority,
          task_section_id: task_section&.id
        )
      else
        list.tasks.create(
          name: task.name,
          description: task.description,
          priority: task.priority
        )
      end
    end

    response[:success] = true
    response
  end
end
