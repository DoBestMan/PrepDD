import {gql} from 'apollo-boost';
import {useMutation} from 'react-apollo';
import {SignInUser, SignInUserVariables} from './__generated__/SignInUser';

export default function useSignInUser(variables: SignInUserVariables) {
  return useMutation<SignInUser, SignInUserVariables>(
    gql`
      mutation SignInUser($email: String!, $password: String!) {
        signInUser(email: $email, password: $password) {
          currentUser {
            id
            user {
              id
              fullName
              email
            }
          }
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
