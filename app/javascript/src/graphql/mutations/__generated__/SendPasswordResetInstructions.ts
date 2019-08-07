/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SendPasswordResetInstructions
// ====================================================

export interface SendPasswordResetInstructions_sendResetPasswordInstructions_errors {
  __typename: "FormError";
  /**
   * Which field this error came from
   */
  path: string | null;
  /**
   * A description of the error
   */
  message: string;
}

export interface SendPasswordResetInstructions_sendResetPasswordInstructions {
  __typename: "SendResetPasswordInstructionsPayload";
  errors: SendPasswordResetInstructions_sendResetPasswordInstructions_errors[];
  success: boolean;
}

export interface SendPasswordResetInstructions {
  sendResetPasswordInstructions: SendPasswordResetInstructions_sendResetPasswordInstructions | null;
}

export interface SendPasswordResetInstructionsVariables {
  email: string;
}
