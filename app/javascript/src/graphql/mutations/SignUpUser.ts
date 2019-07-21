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
  ) {
    signUpUser(
      fullName: $fullName
      email: $email
      password: $password
      companyName: $companyName
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
