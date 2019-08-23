/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddTeamMember
// ====================================================

export interface AddTeamMember_addTeamMember_errors {
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

export interface AddTeamMember_addTeamMember_user {
  __typename: "User";
  id: string;
  fullName: string;
  email: string;
}

export interface AddTeamMember_addTeamMember_teams {
  __typename: "Team";
  id: string;
  name: string;
}

export interface AddTeamMember_addTeamMember_role {
  __typename: "Role";
  id: string;
  name: string;
}

export interface AddTeamMember_addTeamMember {
  __typename: "AddTeamMemberPayload";
  errors: AddTeamMember_addTeamMember_errors[];
  success: boolean;
  user: AddTeamMember_addTeamMember_user;
  teams: AddTeamMember_addTeamMember_teams[];
  role: AddTeamMember_addTeamMember_role;
}

export interface AddTeamMember {
  addTeamMember: AddTeamMember_addTeamMember | null;
}

export interface AddTeamMemberVariables {
  email: string;
  fullName: string;
  role: string;
  team: string;
  companyId: string;
}
