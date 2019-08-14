/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_currentUser_user {
  __typename: "User";
  id: string;
  fullName: string;
  email: string;
  displayName: string;
}

export interface CurrentUser_currentUser {
  __typename: "CurrentUser";
  id: string;
  user: CurrentUser_currentUser_user | null;
}

export interface CurrentUser {
  /**
   * The currently logged in user
   */
  currentUser: CurrentUser_currentUser | null;
}
