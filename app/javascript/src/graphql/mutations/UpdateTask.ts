import {createMutationHook, gql} from '../graphqlHelpers';
import {
  UpdateTask,
  UpdateTaskVariables,
} from './__generated__/UpdateTask';

export const useUpdateTask = createMutationHook<
  UpdateTask,
  UpdateTaskVariables
>(gql`
  mutation UpdateTask(
    $id: ID!
    $name: String, 
    $description: String, 
    $priority: String, 
    $status: String, 
  ) {
    updateTask(
      id: $id, 
      name: $name, 
      description: $description, 
      priority: $priority, 
      status: $status, 
    ) {
      success
      errors {
        path
        message
      }
      task {
        id
        name
        priority
        status
        dueDate
        updatedAt
        userOwners{
          id
          fullName
        }
        teamOwners{
          id
          name
        }
        userReviewers{
          id
          fullName
        }
      }
    }
  }
`);
