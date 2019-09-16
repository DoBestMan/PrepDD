import {createMutationHook, gql} from '../graphqlHelpers';
import {deleteTasks, deleteTasksVariables} from './__generated__/deleteTasks';

const deleteTasks = createMutationHook<deleteTasks, deleteTasksVariables>(gql`
  mutation deleteTasks($taskIds: [ID!]!) {
    deleteTasks(taskIds: $taskIds) {
      success
      taskIds
    }
  }
`);

export default deleteTasks;
