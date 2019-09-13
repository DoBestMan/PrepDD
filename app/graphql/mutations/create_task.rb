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

    response[:success] = true
    response
  end
end
