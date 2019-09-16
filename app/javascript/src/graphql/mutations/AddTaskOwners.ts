import {createMutationHook, gql} from '../graphqlHelpers';
import {
  AddTaskOwners,
  AddTaskOwnersVariables,
} from './__generated__/AddTaskOwners';

export const useAddTaskOwners = createMutationHook<
  AddTaskOwners,
  AddTaskOwnersVariables
>(gql`
  mutation AddTaskOwners(
    $taskID: ID!
    $userOwners: [String!]
    $userReviewers: [String!]
    $teamOwners: [ID!]
    $teamReviewers: [ID!]
  ) {
    addTaskOwners(
      taskID: $taskID
      userOwners: $userOwners
      userReviewers: $userReviewers
      teamOwners: $teamOwners
      teamReviewers: $teamReviewers
    ) {
      errors {
        path
        message
      }
      success
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
