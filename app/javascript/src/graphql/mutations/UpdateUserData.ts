
import {createMutationHook, gql} from '../graphqlHelpers';
import {
  UpdateUserData,
  UpdateUserDataVariables,
} from './__generated__/UpdateUserData';

export const useUpdateUserData = createMutationHook<
  UpdateUserData,
  UpdateUserDataVariables
  >(gql`
  mutation UpdateUserData(
    $email: String!,
    $fullName: String!,
    $displayName: String!,
    $lastViewedCompanyId: ID, 
  ) {
    updateUserData(
      email: $email, 
      fullName: $fullName, 
      displayName: $displayName, 
      lastViewedCompanyId: $lastViewedCompanyId
    ) {
      errors {
        path
        message
      }
      success
    }
  }
`);


