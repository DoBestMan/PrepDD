import { createMutationHook, gql } from '../graphqlHelpers'
import { 
  UpdateCurrentUser, 
  UpdateCurrentUserVariables, 
  UpdateCurrentUserVariables_user 
} from './__generated__/auth'

export const updateCurrentUser = createMutationHook<
  UpdateCurrentUser, 
  UpdateCurrentUserVariables
  >(gql`
  mutation CurrentUser($user: UpdateCurrentUserVariables_user!) {
    currentUser(user: $user) {
      id
      user
    }
  }
`)