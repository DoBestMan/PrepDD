class Mutations::AddListOwner < GraphQL::Schema::Mutation
  argument :listId, ID, required: true
  argument :userIds, [ID], required: false
  argument :teamIds, [ID], required: false

  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(list_id: nil, user_ids: nil, team_ids: nil)
    response = { errors: [] }

    if user_ids
      user_ids.each do |user_id|
        list_owner = ListsUser.create(list_id: list_id, user_id: user_id)

        list_owner.errors.messages&.each do |path, messages|
          messages.each do |message|
            response[:errors].push(
              { path: path.to_s.camelcase(:lower), message: message }
            )
            response[:success] = false
          end
        end

      end
    end

    if team_ids
      team_ids.each do |team_id|
        list_owner = ListsUser.create(list_id: list_id, team_id: team_id)

        list_owner.errors.messages&.each do |path, messages|
          messages.each do |message|
            response[:errors].push(
              { path: path.to_s.camelcase(:lower), message: message }
            )
            response[:success] = false
          end
        end

      end
    end

    response[:success] = true

    response
  end
end
