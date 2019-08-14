import {createMutationHook, gql} from '../graphqlHelpers';

export const useUpdateUserDetails = createMutationHook<
  UpdateUserDetails,
  UpdateUserDetailsVariables
  >(gql`
  mutation UpdateUserPassword(
    $fullName: String!,
    $displayName: String!,
    $email: String!,
  ) {
    updateUserPassword(
      fullName: $fullName, 
      displayName: $displayName, 
      $email: $email
    ) {
      errors {
        path
        message
      }
      success
    }
  }
`);