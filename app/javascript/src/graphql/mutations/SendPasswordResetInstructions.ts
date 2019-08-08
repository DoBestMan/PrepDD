import {createMutationHook, gql} from '../graphqlHelpers';
import {
  SendPasswordResetInstructions,
  SendPasswordResetInstructionsVariables,
} from './__generated__/SendPasswordResetInstructions';

export const useSendPasswordResetInstructions = createMutationHook<
  SendPasswordResetInstructions,
  SendPasswordResetInstructionsVariables
>(gql`
  mutation SendPasswordResetInstructions($email: String!) {
    sendResetPasswordInstructions(email: $email) {
      errors {
        path
        message
      }
      success
    }
  }
`);
