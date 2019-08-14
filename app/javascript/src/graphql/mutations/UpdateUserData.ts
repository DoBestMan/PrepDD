
import {createMutationHook, gql} from '../graphqlHelpers';
import {
  UpdateUserData,
  UpdateUserDataVariables,
} from './__generated__/UpdateUserData';

export const useUpdateUserData = createMutationHook<
  UpdateUserData,
  UpdateUserDataVariables
  >(gql`
  mutation UpdateUserData(
    $email: String!,
    $fullName: String!,
    $displayName: String!
  ) {
    updateUserData(
      email: $email, 
      fullName: $fullName, 
      displayName: $displayName, 
    ) {
      errors {
        path
        message
      }
      success
    }
  }
`);


