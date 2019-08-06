import {createMutationHook, gql} from '../graphqlHelpers';
import {CreateCompany, CreateCompanyVariables} from "./__generated__/CreateCompany";

export const useCompanyCreate = createMutationHook<
  CreateCompany,
  CreateCompanyVariables
  >(gql`
  mutation CreateCompany(
    $name: String!
    ) {
    createCompany(
    name: $name,
    ){
      company {
        name
      }
      errors {
        path
        message
      }
      success
    }
  }
`);
