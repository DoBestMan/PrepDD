/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserForPasswordReset
// ====================================================

export interface UserForPasswordReset_userForPasswordReset {
  __typename: "UserForPasswordReset";
  email: string;
  resetPasswordPeriodValid: boolean | null;
}

export interface UserForPasswordReset {
  /**
   * Information for resetting a users password
   */
  userForPasswordReset: UserForPasswordReset_userForPasswordReset | null;
}

export interface UserForPasswordResetVariables {
  token: string;
}
