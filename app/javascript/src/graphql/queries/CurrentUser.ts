import {createQueryHook, gql} from '../graphqlHelpers';
import {
  CurrentUser,
  CurrentUser_currentUser_user,
} from './__generated__/CurrentUser';

export type User = CurrentUser_currentUser_user;

export const useCurrentUser = createQueryHook<CurrentUser, {}>(gql`
  query CurrentUser {
    currentUser {
      id
      user {
        id
        email
        fullName
        displayName
        profileUrl
        lastViewedCompanyId
        ownedCompanies {
          id
          name
        }
        companies {
          id
          name
          logoUrl
        }
        teams {
          id
          companyId
          name
        }
        roles {
          id
          name
          companyId
        }
      }
    }
  }
`);
