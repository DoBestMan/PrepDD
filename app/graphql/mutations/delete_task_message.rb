class Mutations::DeleteTaskMessage < GraphQL::Schema::Mutation
  argument :id, ID, required: true

  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(id: nil, message: nil)
    response = { errors: [] }

    TaskMessage.find(id).destroy!

    response[:success] = true
    response
  end
end
