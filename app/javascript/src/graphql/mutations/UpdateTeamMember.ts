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
    $id: ID!
    $fullName: String!
    $companyId: ID!
    $role: ID!
  ) {
    updateTeamMember(
      id: $id
      fullName: $fullName
      companyId: $companyId
      role: $role
    ) {
      success
      errors {
        path
        message
      }
      user {
        id
        fullName
        profileUrl
        roles {
          id
          name
          companyId
        }
        teams {
          id
          name
          companyId
        }
        companies {
          id
          name
          logoUrl
        }
      }
    }
  }
`);
