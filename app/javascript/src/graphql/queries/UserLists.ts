import {createQueryHook, gql} from '../graphqlHelpers';
import {UserLists} from './__generated__/UserLists';

export const useUserLists = createQueryHook<UserLists, {}>(gql`
  query UserLists {
    userLists {
      id
      lists {
        id
        name
        sections {
          id
          name
        }
      }
    }
  }
`);
