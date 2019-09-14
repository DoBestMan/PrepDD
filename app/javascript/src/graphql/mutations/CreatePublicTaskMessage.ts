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
		createTaskMessages(taskId: $taskId, message: $message) {
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
