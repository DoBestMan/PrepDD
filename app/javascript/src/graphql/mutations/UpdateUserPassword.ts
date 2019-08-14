
import {createMutationHook, gql} from '../graphqlHelpers';
import {
  UpdateUserPassword,
  UpdateUserPasswordVariables,
} from './__generated__/UpdateUserPassword';

export const useUpdateUserPassword = createMutationHook<
  UpdateUserPassword,
  UpdateUserPasswordVariables
  >(gql`
  mutation UpdateUserPassword(
  $email: String!,
  $oldPassword: String!,
  $newPassword: String!,
  ) {
    updateUserPassword(
    email: $email,
    oldPassword: $oldPassword,
    newPassword: $newPassword,
    ) {
      errors {
        path
        message
      }
      success
    }
  }
`);


