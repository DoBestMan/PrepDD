import { createQueryHook, gql } from '../graphqlHelpers';
import { taskMessages } from './__generated__/taskMessages';

const taskMessages = createQueryHook<taskMessages, {}>(gql`
	query taskMessages($id: ID!) {
		task(id: $id) {
			messages {
				message
				user {
					fullName
				}
				createdAt
			}
		}
	}
`);

export default taskMessages;
