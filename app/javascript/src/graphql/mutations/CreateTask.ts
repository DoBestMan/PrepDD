import {createMutationHook, gql} from '../graphqlHelpers';
import {CreateTask, CreateTaskVariables} from './__generated__/CreateTask';

export const useCreateTask = createMutationHook<
  CreateTask,
  CreateTaskVariables
>(gql`
  mutation CreateTask($listId: ID!, $tasks: [TaskAttributes!]!) {
    createTask(listId: $listId, tasks: $tasks) {
      errors {
        path
        message
      }
      success
    }
  }
`);
