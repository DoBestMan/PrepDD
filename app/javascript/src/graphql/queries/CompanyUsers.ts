import {createQueryHook, gql} from '../graphqlHelpers';
import {CompanyUsers} from './__generated__/CompanyUsers';

export const useCompanyUsers = createQueryHook<CompanyUsers, {}>(gql`
  query CompanyUsers($companyId: ID!, $teamId: ID, $limit: Int, $offset: Int) {
    companyUsers(
      CompanyId: $companyId
      TeamId: $teamId
      limit: $limit
      offset: $offset
    ) {
      company {
        id
        name
        teams {
          id
          name
        }
      }
      users {
        id
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
  }
`);
