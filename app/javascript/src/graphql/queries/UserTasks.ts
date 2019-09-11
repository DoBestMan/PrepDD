import {createQueryHook, gql} from '../graphqlHelpers';
import {UserTasks} from './__generated__/UserTasks';

export const useUserTasks = createQueryHook<UserTasks, {}>(gql`
  query UserTasks(
    $listIds: [ID!]!, 
    $sectionIds: [ID!]!, 
    $offset: Int, 
    $limit: Int, 
  ) {
    userTasks(
      listIds: $listIds, 
      sectionIds: $sectionIds, 
      offset: $offset, 
      limit: $limit, 
    ) {
      id
      name
      priority
      status
      dueDate
      updatedAt
      userOwners{
        id
        email
        fullName
        profileUrl
      }
      teamOwners{
        id
        name
      }
      reviewers{
        id
        fullName
      }
    }
  }
`);
