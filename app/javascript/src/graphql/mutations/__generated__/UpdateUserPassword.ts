/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserPassword
// ====================================================

export interface UpdateUserPassword_updateUserPassword_errors {
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

export interface UpdateUserPassword_updateUserPassword {
  __typename: "UpdateUserPasswordPayload";
  errors: UpdateUserPassword_updateUserPassword_errors[];
  success: boolean;
}

export interface UpdateUserPassword {
  updateUserPassword: UpdateUserPassword_updateUserPassword | null;
}

export interface UpdateUserPasswordVariables {
  password: string;
}
