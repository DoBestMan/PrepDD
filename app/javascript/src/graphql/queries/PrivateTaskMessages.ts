/* Keeping Private and Public Message queries separate to 
 * stave off mishaps */
import { createQueryHook, gql } from '../graphqlHelpers';
import { privateTaskMessages } from './__generated__/privateTaskMessages';

const PrivateTaskMessages = createQueryHook<privateTaskMessages, {}>(gql`
	query privateTaskMessages($taskId: ID!) {
		privateTaskMessages(taskId: $taskId) {
			message 
			user {
				fullName
			}
			createdAt
		}
	}
`);

export default PrivateTaskMessages;
