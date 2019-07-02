class Types::MutationType < GraphQL::Schema::Object
  field :register_user, mutation: Mutations::RegisterUser
end
