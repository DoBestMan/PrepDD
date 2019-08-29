import {createQueryHook, gql} from '../graphqlHelpers';
import {SearchCompanies} from './__generated__/SearchCompanies';

export const useSearchCompanies = createQueryHook<SearchCompanies, {}>(gql`
  query SearchCompanies($text: String!) {
    searchCompanies(text: $text) {
      users {
        id
        fullName
        profileUrl
        companies {
          id
          name
          logoUrl
        }
      }
      companies {
        id
        name
        logoUrl
      }
    }
  }
`);
