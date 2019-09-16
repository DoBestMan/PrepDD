import {createMutationHook, gql} from '../graphqlHelpers';
import {UpdateTask, UpdateTaskVariables} from './__generated__/UpdateTask';

export const useUpdateTask = createMutationHook<
  UpdateTask,
  UpdateTaskVariables
>(gql`
  mutation UpdateTask(
    $id: ID!
    $name: String
    $description: String
    $priority: String
    $status: String
    $dueDate: String
  ) {
    updateTask(
      id: $id
      name: $name
      description: $description
      priority: $priority
      status: $status
      dueDate: $dueDate
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
        userOwners {
          id
          email
          fullName
          profileUrl
        }
        teamOwners {
          id
          name
        }
        userReviewers {
          id
          email
          fullName
          profileUrl
        }
        teamReviewers {
          id
          name
        }
      }
    }
  }
`);
