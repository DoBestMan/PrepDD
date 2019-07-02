module Types
  UserType =
    GraphQL::ObjectType.define do
      name 'User'
      description 'User'

      field :lastName, !types.String, property: :last_name
      field :firstName, !types.String, property: :first_name
      field :email, !types.String
    end
end
