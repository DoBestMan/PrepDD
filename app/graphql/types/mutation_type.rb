module Types
  class MutationType < GraphQL::Schema::Object
    field :updateUserData, mutation: Mutations::UpdateUserData
    field :createCompany, mutation: Mutations::CreateCompany
    field :updateUserNotificatiosn, mutation: Mutations::UpdateUserNotificatiosn
    field :updateUserPassword, mutation: Mutations::UpdateUserPassword
    field :sign_in_user, mutation: Mutations::SignInUser
    field :sign_up_user, mutation: Mutations::SignUpUser
    field :sign_out_user, mutation: Mutations::SignOutUser
    field :send_reset_password_instructions,
          mutation: Mutations::SendResetPasswordInstructions
  end
end
