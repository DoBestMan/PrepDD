import {createMutationHook, gql} from '../graphqlHelpers';
import {
  UpdateTeamMember,
  UpdateTeamMemberVariables,
} from './__generated__/UpdateTeamMember';

export const useUpdateTeamMember = createMutationHook<
  UpdateTeamMember,
  UpdateTeamMemberVariables 
  >(gql`
  mutation UpdateTeamMember(
    $email: String!,
    $fullName: String!,
    $companyId: ID!, 
    $newRole: ID!, 
    $oldRole: ID!
  ) {
    updateTeamMember(
      email: $email, 
      fullName: $fullName, 
      companyId: $companyId, 
      newRole: $newRole, 
      oldRole: $oldRole
    ) {
      errors {
        path
        message
      }
      success
    }
  }
`);


