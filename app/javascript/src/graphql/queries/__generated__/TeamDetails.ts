/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TeamDetails
// ====================================================

export interface TeamDetails_team_users_companies {
  __typename: "Company";
  id: string;
  name: string;
}

export interface TeamDetails_team_users_teams {
  __typename: "Team";
  id: string;
  name: string;
}

export interface TeamDetails_team_users_roles {
  __typename: "Role";
  id: string;
  name: string;
}

export interface TeamDetails_team_users {
  __typename: "User";
  id: string;
  fullName: string;
  companies: TeamDetails_team_users_companies[] | null;
  teams: TeamDetails_team_users_teams[] | null;
  roles: TeamDetails_team_users_roles[] | null;
}

export interface TeamDetails_team {
  __typename: "Team";
  id: string;
  name: string;
  users: TeamDetails_team_users[];
}

export interface TeamDetails {
  /**
   * Find a team by id
   */
  team: TeamDetails_team;
}

export interface TeamDetailsVariables {
  id: string;
}
