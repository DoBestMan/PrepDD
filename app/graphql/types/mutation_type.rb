module Types
  class MutationType < GraphQL::Schema::Object
    field :register_user, mutation: Mutations::RegisterUser
  end
end
