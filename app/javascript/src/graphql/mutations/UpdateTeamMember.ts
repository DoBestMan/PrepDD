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
    $role: ID!,
  ) {
    updateTeamMember(
      email: $email, 
      fullName: $fullName, 
      companyId: $companyId, 
      role: $role,
    ) {
      errors {
        path
        message
      }
      success
    }
  }
`);


