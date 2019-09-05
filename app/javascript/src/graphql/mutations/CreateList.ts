import {createMutationHook, gql} from '../graphqlHelpers';
import {
  CreateList,
  CreateListVariables,
} from './__generated__/CreateList';

export const useCreateList = createMutationHook<
  CreateList,
  CreateListVariables
>(gql`
  mutation CreateList(
    $name: String!, 
    $description: String, 
    $requesterId: ID!, 
    $responderId: ID!, 
    $isTemplate: Boolean!, 
    $isPublicTemplate: Boolean!, 
    $tasks: [TaskAttributes!],
  ) {
    createList(
      name: $name, 
      description: $description, 
      requesterId: $requesterId, 
      responderId: $responderId, 
      isTemplate: $isTemplate, 
      isPublicTemplate: $isPublicTemplate, 
      tasks: $tasks, 
    ) {
      list {
        id
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
