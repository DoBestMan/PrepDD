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

export interface AddTeamMember_addTeamMember_user_roles {
  __typename: "RolesUser";
  id: string;
  name: string;
  companyId: string;
}

export interface AddTeamMember_addTeamMember_user_teams {
  __typename: "Team";
  id: string;
  name: string;
  companyId: string;
}

export interface AddTeamMember_addTeamMember_user_companies {
  __typename: "Company";
  id: string;
  name: string;
}

export interface AddTeamMember_addTeamMember_user {
  __typename: "User";
  id: string;
  fullName: string;
  profileUrl: string | null;
  roles: AddTeamMember_addTeamMember_user_roles[] | null;
  teams: AddTeamMember_addTeamMember_user_teams[] | null;
  companies: AddTeamMember_addTeamMember_user_companies[] | null;
}

export interface AddTeamMember_addTeamMember_companies {
  __typename: "Company";
  id: string;
  name: string;
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
  companies: AddTeamMember_addTeamMember_companies[];
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
