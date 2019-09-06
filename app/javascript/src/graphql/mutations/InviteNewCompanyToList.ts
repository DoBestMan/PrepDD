import {createMutationHook, gql} from '../graphqlHelpers';
import {
  InviteNewCompanyToList,
  InviteNewCompanyToListVariables,
} from './__generated__/InviteNewCompanyToList';

export const useInviteNewCompanyToList = createMutationHook<
  InviteNewCompanyToList,
  InviteNewCompanyToListVariables
>(gql`
  mutation InviteNewCompanyToList(
    $listId: ID!, 
    $companyId: ID!, 
    $ownerEmail: String!,
    $newCompanyName: String!, 
    $isRequest: Boolean, 
    $isShare: Boolean,  
  ) {
    inviteNewCompanyToList(
      listId: $listId, 
      companyId: $companyId, 
      ownerEmail: $ownerEmail, 
      newCompanyName: $newCompanyName, 
      isRequest: $isRequest, 
      isShare: $isShare, 
    ) {
      errors {
        path
        message
      }
      success
    }
  }
`);
