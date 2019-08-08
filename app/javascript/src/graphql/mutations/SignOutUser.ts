import {createMutationHook, gql} from '../graphqlHelpers';
import {SignOutUser} from './__generated__/SignOutUser';

export const useSignOutUser = createMutationHook<SignOutUser, {}>(gql`
  mutation SignOutUser {
    signOutUser {
      errors {
        path
        message
      }
      success
    }
  }
`);
