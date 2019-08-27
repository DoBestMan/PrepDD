import {createMutationHook, gql} from '../graphqlHelpers';
import {
  RemoveCompanyMember,
  RemoveCompanyMemberVariables,
} from './__generated__/RemoveCompanyMember';

export const useRemoveCompanyMember = createMutationHook<
  RemoveCompanyMember,
  RemoveCompanyMemberVariables 
  >(gql`
  mutation RemoveCompanyMember(
    $companyId: ID!, 
    $userId: ID, 
    $userIds: [ID!]
  ) {
    removeCompanyMember(
      companyId: $companyId, 
      userId: $userId, 
      userIds: $userIds, 
    ) {
      errors {
        path
        message
      }
      success
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
    }
  }
`);


