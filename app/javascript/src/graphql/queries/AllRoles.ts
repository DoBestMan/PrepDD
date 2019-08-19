import {createQueryHook, gql} from '../graphqlHelpers';
import {
  AllRoles,
} from './__generated__/AllRoles';

export const useAllRoles = createQueryHook<AllRoles, {}>(gql`
  query AllRoles {
    roles {
      id
      name
    }
  }
`);