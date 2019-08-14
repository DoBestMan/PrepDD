/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignOutUser
// ====================================================

export interface SignOutUser_signOutUser_errors {
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

export interface SignOutUser_signOutUser {
  __typename: "SignOutUserPayload";
  errors: SignOutUser_signOutUser_errors[];
  success: boolean;
}

export interface SignOutUser {
  signOutUser: SignOutUser_signOutUser | null;
}
