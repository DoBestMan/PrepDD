import {createQueryHook, gql} from '../graphqlHelpers';
import {AllTemplates} from './__generated__/AllTemplates';

export const useAllTemplates = createQueryHook<AllTemplates, {}>(gql`
  query AllTemplates {
    templateLists {
      id
      name
      isTemplate
      isPublicTemplate
      requesterCompany {
        id
        name
        logoUrl
        owner {
          fullName
        }
      }
      responderCompany {
        id
        name
        logoUrl
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
