module Types
  class MutationType < GraphQL::Schema::Object
    field :inviteListOwner, mutation: Mutations::InviteListOwner
    field :inviteNewCompanyToList, mutation: Mutations::InviteNewCompanyToList
    field :addListOwner, mutation: Mutations::AddListOwner
    field :createTask, mutation: Mutations::CreateTask
    field :createList, mutation: Mutations::CreateList
    field :createAssociatedCompany, mutation: Mutations::CreateAssociatedCompany
    field :updateCompanySettings, mutation: Mutations::UpdateCompanySettings
    field :removeCompanyMember, mutation: Mutations::RemoveCompanyMember
    field :updateTeamMember, mutation: Mutations::UpdateTeamMember
    field :removeTeamMember, mutation: Mutations::RemoveTeamMember
    field :addTeamMember, mutation: Mutations::AddTeamMember
    field :createTeam, mutation: Mutations::CreateTeam
    field :createCompany, mutation: Mutations::CreateCompany
    field :updateUserPassword, mutation: Mutations::UpdateUserPassword
    field :updateUserData, mutation: Mutations::UpdateUserData
    field :sign_in_user, mutation: Mutations::SignInUser
    field :sign_up_user, mutation: Mutations::SignUpUser
    field :sign_out_user, mutation: Mutations::SignOutUser
    field :send_reset_password_instructions,
          mutation: Mutations::SendResetPasswordInstructions
  end
end
