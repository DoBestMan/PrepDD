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
  displayName: string;
  email: string;
}

export interface CurrentUser_currentUser_ownedCompanies {
  __typename: "Company";
  name: string;
}

export interface CurrentUser_currentUser_memberCompanies {
  __typename: "Company";
  name: string;
}

export interface CurrentUser_currentUser_teams {
  __typename: "Team";
  name: string;
}

export interface CurrentUser_currentUser {
  __typename: "CurrentUser";
  id: string;
  user: CurrentUser_currentUser_user | null;
  ownedCompanies: CurrentUser_currentUser_ownedCompanies[] | null;
  memberCompanies: CurrentUser_currentUser_memberCompanies[] | null;
  teams: CurrentUser_currentUser_teams[] | null;
}

export interface CurrentUser {
  /**
   * The currently logged in user
   */
  currentUser: CurrentUser_currentUser | null;
}
