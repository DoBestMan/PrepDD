/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignUpUser
// ====================================================

export interface SignUpUser_signUpUser_user {
  __typename: "User";
  email: string;
}

export interface SignUpUser_signUpUser_errors {
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

export interface SignUpUser_signUpUser {
  __typename: "SignUpUserPayload";
  user: SignUpUser_signUpUser_user | null;
  errors: SignUpUser_signUpUser_errors[];
  success: boolean;
}

export interface SignUpUser {
  signUpUser: SignUpUser_signUpUser | null;
}

export interface SignUpUserVariables {
  fullName: string;
  email: string;
  password: string;
  companyName: string;
  socialLogin: boolean;
  provider: string;
  tokenID: string;
  uuID: string;
}
