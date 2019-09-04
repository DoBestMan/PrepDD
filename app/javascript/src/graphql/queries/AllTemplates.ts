import {createQueryHook, gql} from '../graphqlHelpers';
import {AllTemplates} from './__generated__/AllTemplates';

export const useAllTemplates = createQueryHook<AllTemplates, {}>(gql`
  query AllTemplates {
    templateLists {
      id
      name
      requesterCompany {
        id
        name
        owner {
          fullName
        }
      }
      responderCompany {
        id
        name
      }
      tasks {
        id
        name
        section
        description
        priority
        status        
      }
    }
  }
`);
