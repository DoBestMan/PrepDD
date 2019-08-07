import {createQueryHook, gql} from '../graphqlHelpers';
import {
  UserForPasswordReset,
  UserForPasswordResetVariables,
} from './__generated__/UserForPasswordReset';

export const useUserForPasswordReset = createQueryHook<
  UserForPasswordReset,
  UserForPasswordResetVariables
>(gql`
  query UserForPasswordReset($token: String!) {
    userForPasswordReset(token: $token) {
      email
      resetPasswordPeriodValid
    }
  }
`);
