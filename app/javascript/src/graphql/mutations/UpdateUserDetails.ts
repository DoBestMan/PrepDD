import {createMutationHook, gql} from '../graphqlHelpers';
import {UpdateUserDetails, UpdateUserDetailsvariables} from './__generated__/SignUpUser';

export const useUpdateUserDetails = createMutationHook<
  UpdateUserDetails,
  UpdateUserDetailsvariables
>(gql`
  mutation UpdateUserDetails(
    $fullName: String!,
    $displayName: String!,
    $email: String!
    ) {
    updateUserDetails(
      fullName: $fullName,
      email: $email,
      displayName: $displayName,
    ){
      currentUser {
        id
        user {
          id
          fullName
          email
          displayName
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
