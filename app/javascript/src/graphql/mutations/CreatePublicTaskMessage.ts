/* Again, using separate mutations to be safe and make it 
 * hard to mixup private and public */
import {createMutationHook, gql} from '../graphqlHelpers';
import {
	CreatePublicTaskMessage,
	CreatePublicTaskMessageVariables 
} from './__generated__/CreatePublicTaskMessage';

const createPublicTaskMessage = createMutationHook<
	CreatePublicTaskMessage,
	CreatePublicTaskMessageVariables 
>(gql`
	mutation CreatePublicTaskMessage($taskId: ID!, $message: String!) {
		createTaskMessages(taskId: $taskId, message: $message, isPublic: true) {
			success
			message {
				id
				message
				createdAt
				user {
				  fullName
				}
			}
		}
	}
`);

export default createPublicTaskMessage;
