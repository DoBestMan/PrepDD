module Types
  class MutationType < GraphQL::Schema::Object
    field :sign_in_user, mutation: Mutations::SignInUser
    field :sign_up_user, mutation: Mutations::SignUpUser
  end
end
