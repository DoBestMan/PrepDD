import {createQueryHook, gql} from '../graphqlHelpers';
import {
  CompanySettings,
} from './__generated__/CompanySettings';

export const useCompanySettings = createQueryHook<CompanySettings, {}>(gql`
  query CompanySettings($id: ID!) {
    company(id: $id) {
      id
      name
      parent {
        id
        name
      }
      broker {
        id
        name
      }
      totalUsers
      totalStorage
      subscription {
        id
        maxUsers
        maxStorage
      }
      autoPdf
      autoWatermark
      previewOnly
    }
  }
`);