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
    $password: String!
  ) {
    updateUserPassword(
      password: $password, 
    ) {
      errors {
        path
        message
      }
      success
    }
  }
`);