import {createMutationHook, gql} from '../graphqlHelpers';
import {SignInUser, SignInUserVariables} from './__generated__/SignInUser';

export const useSignInUser = createMutationHook<
  SignInUser,
  SignInUserVariables
>(gql`
  mutation SignInUser(
    $email: String!
    $password: String!
    $socialLogin: Boolean!
    $provider: String!
    $tokenID: String!
    $uuID: String!
  ) {
    signInUser(
      email: $email
      password: $password
      socialLogin: $socialLogin
      provider: $provider
      tokenID: $tokenID
      uuID: $uuID
    ) {
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
