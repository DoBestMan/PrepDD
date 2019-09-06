import {createMutationHook, gql} from '../graphqlHelpers';
import {
  InviteListOwner,
  InviteListOwnerVariables,
} from './__generated__/InviteListOwner';

export const useInviteListOwner = createMutationHook<
  InviteListOwner,
  InviteListOwnerVariables
>(gql`
  mutation InviteListOwner(
    $listId: ID!, 
    $companyId: ID!, 
    $userName: String!, 
    $userEmail: String!, 
  ) {
    inviteListOwner(
      listId: $listId, 
      companyId: $companyId, 
      userName: $userName, 
      userEmail: $userEmail, 
    ) {
      errors {
        path
        message
      }
      success
    }
  }
`);
