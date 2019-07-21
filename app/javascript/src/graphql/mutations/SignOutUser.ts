import {gql} from 'apollo-boost';
import {useMutation} from 'react-apollo';
import {SignOutUser} from './__generated__/SignInUser';

export default function useSignOutUser<SignOutUser>(variables: {}) {
  return useMutation(
    gql`
      mutation SignOutUser {
        signOutUser {
          errors {
            path
            message
          }
          success
        }
      }
    `,
    {variables}
  );
}
