class Mutations::CreateList < GraphQL::Schema::Mutation
  argument :name, String, required: true
  argument :description, String, required: false
  argument :requesterId, ID, required: true
  argument :responderId, ID, required: false
  argument :isTemplate, Boolean, required: true
  argument :isPublicTemplate, Boolean, required: true

  field :list, Types::ListType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(name: nil, description: nil, requester_id: nil, responder_id: nil, is_template: nil,
              is_public_template: nil)
    response = { errors: [] }

    list = List.create(name: name, description: description, requester_id: requester_id,
                       responder_id: responder_id, is_template: is_template,
                       is_public_template: is_template
    )

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
