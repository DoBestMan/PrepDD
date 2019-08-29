import {createMutationHook, gql} from '../graphqlHelpers';
import {
  CreateAssociatedCompany,
  CreateAssociatedCompanyVariables,
} from './__generated__/CreateAssociatedCompany';

export const useCreateAssociatedCompany = createMutationHook<
  CreateAssociatedCompany,
  CreateAssociatedCompanyVariables
>(gql`
  mutation CreateAssociatedCompany(
    $companyId: ID!, 
    $ownerEmail: String!, 
    $newCompanyName: String!, 
    $isParent: Boolean, 
    $isBroker: Boolean, 
  ) {
    createAssociatedCompany(
      companyId: $companyId, 
      ownerEmail: $ownerEmail, 
      newCompanyName: $newCompanyName, 
      isParent: $isParent, 
      isBroker: $isBroker
    ) {
      company {
        id
        name
        logoUrl
      }
      errors {
        path
        message
      }
      success
    }
  }
`);
