import {createMutationHook, gql} from '../graphqlHelpers';
import {
  AddListOwner,
  AddListOwnerVariables,
} from './__generated__/AddListOwner';

export const useAddListOwner = createMutationHook<
  AddListOwner,
  AddListOwnerVariables
>(gql`
  mutation AddListOwner(
    $listId: ID!, 
    $companyId: ID!, 
    $userEmails: [String!], 
    $teamIds: [ID!]
  ) {
    addListOwner( 
      listId: $listId, 
      companyId: $companyId, 
      userEmails: $userEmails, 
      teamIds: $teamIds
    ) {
      errors {
        path
        message
      }
      success
    }
  }
`);
