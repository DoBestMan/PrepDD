import {gql} from 'apollo-boost';

export const SEARCH_COMPANY_USERS = gql`
query SearchCompanyUsers($text: String!, $companyId: ID!) {
  searchCompanyUsers(text: $text, companyId: $companyId) {
    users {
      id
      email
      fullName
      profileUrl
    }
    teams {
      id
      name
    }
  }
}
`;