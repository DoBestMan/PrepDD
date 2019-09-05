import {createMutationHook, gql} from '../graphqlHelpers';
import {
  AddListOwner,
  AddListOwnerVariables,
} from './__generated__/AddListOwner';

export const useAddListOwner = createMutationHook<
  AddListOwner,
  AddListOwnerVariables
>(gql`
  mutation AddListOwner($listId: ID!, $userIds: [ID!], $teamIds: [ID!]) {
    addListOwner(listId: $listId, userIds: $userIds, teamIds: $teamIds) {
      errors {
        path
        message
      }
      success
    }
  }
`);
