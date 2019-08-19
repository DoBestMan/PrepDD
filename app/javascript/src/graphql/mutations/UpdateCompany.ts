
import {createMutationHook, gql} from '../graphqlHelpers';
import {
  UpdateCompany,
  UpdateCompanyVariables,
} from './__generated__/UpdateCompany';

export const useUpdateCompany = createMutationHook<
  UpdateCompany,
  UpdateCompanyVariables
  >(gql`
  mutation UpdateCompany(
    $id: ID!,
    $name: String!, 
    $autoPdf: Boolean!, 
    $autoWatermark: Boolean!, 
    $previewOnly: Boolean!
  ) {
    updateCompany(
      id: $id, 
      name: $name, 
      autoPdf: $autoPdf, 
      autoWatermark: $autoWatermark, 
      previewOnly: $previewOnly
    ) {
      errors {
        path
        message
      }
      success
    }
  }
`);


