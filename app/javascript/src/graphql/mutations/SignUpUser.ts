import {createMutationHook, gql} from '../graphqlHelpers';
import {SignUpUser, SignUpUserVariables} from './__generated__/SignUpUser';

export const useSignUpUser = createMutationHook<
  SignUpUser,
  SignUpUserVariables
>(gql`
  mutation SignUpUser(
    $fullName: String!
    $email: String!
    $password: String!
    $companyName: String!
    $socialLogin: Boolean!
    $provider: String!
    $tokenID: String!
    $uuID: String!
  ) {
    signUpUser(
      fullName: $fullName
      email: $email
      password: $password
      companyName: $companyName
      socialLogin: $socialLogin
      provider: $provider
      tokenID: $tokenID
      uuID: $uuID
    ) {
      user {
        email
      }
      errors {
        path
        message
      }
      success
    }
  }
`);
