module Types
  module Input
    class UserInputType < GraphQL::Schema::InputObject
      description 'Properties for registering a new User'
      argument :lastName, String, required: true
      argument :firstName, String, required: true
      argument :email, String, required: true
      argument :password, String, required: true
    end
  end
end
