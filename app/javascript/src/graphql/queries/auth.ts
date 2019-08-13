import { createQueryHook, gql } from '../graphqlHelpers'
import { CurrentUser } from './__generated__/CurrentUser'

export const getCurrentUser = createQueryHook<CurrentUser, {}>(gql`
  query CurrentUser {
    currentUser {
      id
      user {
        id
        fullName
        displayName
        email
      }
    }
  }
`)