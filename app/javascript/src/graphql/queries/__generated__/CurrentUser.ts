/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_currentUser_user_ownedCompanies {
  __typename: "Company";
  id: string;
  name: string;
}

export interface CurrentUser_currentUser_user_companies {
  __typename: "Company";
  id: string;
  name: string;
}

export interface CurrentUser_currentUser_user_teams {
  __typename: "Team";
  id: string;
  name: string;
}

export interface CurrentUser_currentUser_user {
  __typename: "User";
  id: string;
  fullName: string;
  displayName: string;
  email: string;
  ownedCompanies: CurrentUser_currentUser_user_ownedCompanies[] | null;
  companies: CurrentUser_currentUser_user_companies[] | null;
  teams: CurrentUser_currentUser_user_teams[] | null;
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
