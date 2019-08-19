
import {createMutationHook, gql} from '../graphqlHelpers';
import {
  AddTeamMember,
  AddTeamMemberVariables,
} from './__generated__/AddTeamMember';

export const useAddTeamMember = createMutationHook<
  AddTeamMember,
  AddTeamMemberVariables 
  >(gql`
  mutation AddTeamMember(
    $email: String!,
    $fullName: String!,
    $role: ID!, 
    $team: ID!,
    $companyId: ID!
  ) {
    addTeamMember(
      email: $email, 
      fullName: $fullName, 
      role: $role, 
      teamId: $team,
      companyId: $companyId
    ) {
      errors {
        path
        message
      }
      success
    }
  }
`);


