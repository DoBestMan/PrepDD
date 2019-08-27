import {createMutationHook, gql} from '../graphqlHelpers';
import {
  RemoveTeamMember,
  RemoveTeamMemberVariables,
} from './__generated__/RemoveTeamMember';

export const useRemoveTeamMember = createMutationHook<
  RemoveTeamMember,
  RemoveTeamMemberVariables
>(gql`
  mutation RemoveTeamMember($teamId: ID!, $userId: ID!, $userIds: [ID!]) {
    removeTeamMember(teamId: $teamId, userId: $userId, userIds: $userIds) {
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
        }
      }
      errors {
        path
        message
      }
      success
    }
  }
`);
