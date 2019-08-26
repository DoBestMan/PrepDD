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
    $parentName: String, 
    $brokerName: String, 
    $deleteParentId: ID, 
    $deleteBrokerId: ID, 
    $autoPdf: Boolean!, 
    $autoWatermark: Boolean!, 
    $previewOnly: Boolean!
  ) {
    updateCompanySettings(
      id: $id, 
      name: $name,
      parentName: $parentName, 
      brokerName: $brokerName,  
      automaticPdf: $autoPdf, 
      dynamicWatermarking: $autoWatermark, 
      previewOnly: $previewOnly
      deleteParentId: $deleteParentId, 
      deleteBrokerId: $deleteBrokerId, 
    ) {
      errors {
        path
        message
      }
      success
      company {
        id
        name
        logoUrl
        parents {
          id
          name
          logoUrl
        }
        brokers {
          id
          name
          logoUrl
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
  }
`);


