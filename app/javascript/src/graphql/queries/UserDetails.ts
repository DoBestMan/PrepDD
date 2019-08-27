import {createQueryHook, gql} from '../graphqlHelpers';
import {UserDetails} from './__generated__/UserDetails';

export const useUserDetails = createQueryHook<UserDetails, {}>(gql`
  query UserDetails($id: ID!) {
    user(id: $id) {
      id
      email
      fullName
      profileUrl
      roles {
        id
        name
        companyId
      }
      teams {
        id
        name
        companyId
      }
      companies {
        id
        name
      }
    }
  }
`);
