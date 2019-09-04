class Mutations::AddListOwner < GraphQL::Schema::Mutation
  argument :listId, ID, required: true
  argument :ownerId, ID, required: true

  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(list_id: nil, owner_id: nil)
    response = { errors: [] }

    list_owner = ListsUser.create(list_id: list_id, user_id: owner_id)

    list_owner.errors.messages&.each do |path, messages|
      messages.each do |message|
        response[:errors].push(
          { path: path.to_s.camelcase(:lower), message: message }
        )
        response[:success] = false
      end
    end

    if list_owner&.persisted?
      response[:success] = true
    end
    
    response
  end
end
