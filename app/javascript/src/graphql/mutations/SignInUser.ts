import {createMutationHook, gql} from '../graphqlHelpers';
import {SignInUser, SignInUserVariables} from './__generated__/SignInUser';

export const useSignInUser = createMutationHook<
  SignInUser,
  SignInUserVariables
>(gql`
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
`);
