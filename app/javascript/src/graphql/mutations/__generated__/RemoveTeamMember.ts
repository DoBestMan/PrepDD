/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveTeamMember
// ====================================================

export interface RemoveTeamMember_removeTeamMember_user {
  __typename: "User";
  id: string;
  fullName: string;
}

export interface RemoveTeamMember_removeTeamMember_companies {
  __typename: "Company";
  id: string;
  name: string;
}

export interface RemoveTeamMember_removeTeamMember_teams {
  __typename: "Team";
  id: string;
  name: string;
  companyId: string;
}

export interface RemoveTeamMember_removeTeamMember_role {
  __typename: "Role";
  id: string;
  name: string;
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
  companies: RemoveTeamMember_removeTeamMember_companies[] | null;
  teams: RemoveTeamMember_removeTeamMember_teams[] | null;
  role: RemoveTeamMember_removeTeamMember_role | null;
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
