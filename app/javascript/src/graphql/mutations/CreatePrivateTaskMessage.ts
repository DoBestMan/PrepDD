import {createMutationHook, gql} from '../graphqlHelpers';
import {
	CreatePrivateTaskMessage,
	CreatePrivateTaskMessageVariables 
} from './__generated__/CreatePrivateTaskMessage';

const createPrivateTaskMessage = createMutationHook<
	CreatePrivateTaskMessage,
	CreatePrivateTaskMessageVariables 
>(gql`
	mutation CreatePrivateTaskMessage($taskId: ID!, $message: String!) {
		createTaskMessages(taskId: $taskId, message: $message, isPublic: false) {
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

export default createPrivateTaskMessage;
