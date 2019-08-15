/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserDetails
// ====================================================

export interface UserDetails_userDetails_user {
  __typename: "User";
  id: string;
  fullName: string;
  displayName: string;
  email: string;
}

export interface UserDetails_userDetails_ownedCompanies {
  __typename: "Company";
  name: string;
}

export interface UserDetails_userDetails_memberCompanies {
  __typename: "Company";
  name: string;
}

export interface UserDetails_userDetails_teams {
  __typename: "Team";
  name: string;
}

export interface UserDetails_userDetails {
  __typename: "UserDetails";
  user: UserDetails_userDetails_user | null;
  ownedCompanies: UserDetails_userDetails_ownedCompanies[] | null;
  memberCompanies: UserDetails_userDetails_memberCompanies[] | null;
  teams: UserDetails_userDetails_teams[] | null;
}

export interface UserDetails {
  /**
   * The currently logged in user details
   */
  userDetails: UserDetails_userDetails | null;
}
