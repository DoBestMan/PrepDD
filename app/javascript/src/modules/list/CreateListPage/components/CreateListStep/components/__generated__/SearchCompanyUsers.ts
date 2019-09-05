/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchCompanyUsers
// ====================================================

export interface SearchCompanyUsers_searchCompanyUsers_users {
  __typename: "User";
  id: string;
  fullName: string;
  profileUrl: string | null;
}

export interface SearchCompanyUsers_searchCompanyUsers_teams {
  __typename: "Team";
  id: string;
  name: string;
}

export interface SearchCompanyUsers_searchCompanyUsers {
  __typename: "SearchCompanyUsers";
  users: SearchCompanyUsers_searchCompanyUsers_users[] | null;
  teams: SearchCompanyUsers_searchCompanyUsers_teams[] | null;
}

export interface SearchCompanyUsers {
  /**
   * Search users by company id
   */
  searchCompanyUsers: SearchCompanyUsers_searchCompanyUsers;
}

export interface SearchCompanyUsersVariables {
  text: string;
  companyId: string;
}
