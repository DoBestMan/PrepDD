/* same note as the others -- keeping public and private methods
 * segregated */
import { createQueryHook, gql } from '../graphqlHelpers';
import { publicTaskMessages } from './__generated__/publicTaskMessages';

const PublicTaskMessages = createQueryHook<publicTaskMessages, {}>(gql`
	query publicTaskMessages($taskId: ID!) {
		publicTaskMessages(taskId: $taskId) {
			message 
		  user {
				fullName
			}
			createdAt
		}
	}
`);

export default PublicTaskMessages;
