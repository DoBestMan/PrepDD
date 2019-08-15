import {createQueryHook, gql} from '../graphqlHelpers';
import {
  UserDetails,
  UserDetails_userDetails_user,
} from './__generated__/UserDetails';

export type User = UserDetails_userDetails_user;

export const useUserDetails = createQueryHook<UserDetails, {}>(gql`
  query UserDetails {
    userDetails {
      user {
        id
        fullName
        displayName
        email
      }
      ownedCompanies {
        name
      }
      memberCompanies {
        name
      }
      teams {
        name
      }
    }
  }
`);
