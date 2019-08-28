import {createQueryHook, gql} from '../graphqlHelpers';
import {TeamDetails} from './__generated__/TeamDetails';

export const useTeamDetails = createQueryHook<TeamDetails, {}>(gql`
  query TeamDetails($id: ID!) {
    team(id: $id) {
      id
      name
      users {
        id
        fullName
        profileUrl
        companies {
          id
          name
          logoUrl
        }
        teams {
          id
          name
        }
        roles {
          id
          name
        }
      }
    }
  }
`);
