import {createMutationHook, gql} from '../graphqlHelpers';
import {
  UpdateUserPassword,
  UpdateUserPasswordVariables,
} from './__generated__/UpdateUserPassword';

export const useUpdateUserPassword = createMutationHook<
  UpdateUserPassword,
  UpdateUserPasswordVariables
>(gql`
  mutation UpdateUserPassword($password: String!, $oldPassword: String!) {
    updateUserPassword(password: $password, oldPassword: $oldPassword) {
      errors {
        path
        message
      }
      success
    }
  }
`);
