import {createMutationHook, gql} from '../graphqlHelpers';
import {CreateList, CreateListVariables} from './__generated__/CreateList';

export const useCreateList = createMutationHook<
  CreateList,
  CreateListVariables
>(gql`
  mutation CreateList(
    $name: String!
    $description: String
    $requesterId: ID!
    $responderId: ID!
    $tasks: [TaskAttributes!]
  ) {
    createList(
      name: $name
      description: $description
      requesterId: $requesterId
      responderId: $responderId
      tasks: $tasks
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
