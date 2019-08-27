/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveTeamMember
// ====================================================

export interface RemoveTeamMember_removeTeamMember_user_roles {
  __typename: "RolesUser";
  id: string;
  name: string;
  companyId: string;
}

export interface RemoveTeamMember_removeTeamMember_user_teams {
  __typename: "Team";
  id: string;
  name: string;
  companyId: string;
}

export interface RemoveTeamMember_removeTeamMember_user_companies {
  __typename: "Company";
  id: string;
  name: string;
}

export interface RemoveTeamMember_removeTeamMember_user {
  __typename: "User";
  id: string;
  fullName: string;
  profileUrl: string | null;
  roles: RemoveTeamMember_removeTeamMember_user_roles[] | null;
  teams: RemoveTeamMember_removeTeamMember_user_teams[] | null;
  companies: RemoveTeamMember_removeTeamMember_user_companies[] | null;
}

export interface RemoveTeamMember_removeTeamMember_errors {
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

export interface RemoveTeamMember_removeTeamMember {
  __typename: "RemoveTeamMemberPayload";
  user: RemoveTeamMember_removeTeamMember_user | null;
  errors: RemoveTeamMember_removeTeamMember_errors[];
  success: boolean;
}

export interface RemoveTeamMember {
  removeTeamMember: RemoveTeamMember_removeTeamMember | null;
}

export interface RemoveTeamMemberVariables {
  teamId: string;
  userId: string;
  userIds?: string[] | null;
}
