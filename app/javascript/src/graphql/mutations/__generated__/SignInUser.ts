/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignInUser
// ====================================================

export interface SignInUser_signInUser_currentUser_user {
  __typename: "User";
  id: string;
  fullName: string;
  email: string;
}

export interface SignInUser_signInUser_currentUser {
  __typename: "CurrentUser";
  id: string;
  user: SignInUser_signInUser_currentUser_user | null;
}

export interface SignInUser_signInUser_errors {
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

export interface SignInUser_signInUser {
  __typename: "SignInUserPayload";
  currentUser: SignInUser_signInUser_currentUser | null;
  errors: SignInUser_signInUser_errors[];
  success: boolean;
}

export interface SignInUser {
  signInUser: SignInUser_signInUser | null;
}

export interface SignInUserVariables {
  email: string;
  password: string;
  socialLogin: boolean;
  provider: string;
  tokenID: string;
  uuID: string;
}
