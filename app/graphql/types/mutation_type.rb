module Types
  class MutationType < GraphQL::Schema::Object
    field :register_user, mutation: Mutations::RegisterUser
    field :sign_in_user, mutation: Mutations::SignInUser
  end
end
