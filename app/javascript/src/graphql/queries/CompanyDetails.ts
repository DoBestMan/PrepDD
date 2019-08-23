import {createQueryHook, gql} from '../graphqlHelpers';
import {
  CompanyDetails,
} from './__generated__/CompanyDetails';

export const useCompanyDetails = createQueryHook<CompanyDetails, {}>(gql`
  query CompanyDetails($id: ID!) {
    company(id: $id) {
      id
      name
      teams {
        id
        name
      }
      users {
        id
        fullName
        profileUrl
        companies {
          id
          name
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
      owner {
        id
        fullName
      }
    }
  }
`);