/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTeamMember
// ====================================================

export interface UpdateTeamMember_updateTeamMember_errors {
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

export interface UpdateTeamMember_updateTeamMember_user {
  __typename: "User";
  id: string;
  fullName: string;
  email: string;
}

export interface UpdateTeamMember_updateTeamMember_companies {
  __typename: "Company";
  id: string;
  name: string;
}

export interface UpdateTeamMember_updateTeamMember_teams {
  __typename: "Team";
  id: string;
  name: string;
}

export interface UpdateTeamMember_updateTeamMember_role {
  __typename: "Role";
  id: string;
  name: string;
}

export interface UpdateTeamMember_updateTeamMember {
  __typename: "UpdateTeamMemberPayload";
  errors: UpdateTeamMember_updateTeamMember_errors[];
  user: UpdateTeamMember_updateTeamMember_user;
  companies: UpdateTeamMember_updateTeamMember_companies[];
  teams: UpdateTeamMember_updateTeamMember_teams[];
  role: UpdateTeamMember_updateTeamMember_role;
  success: boolean;
}

export interface UpdateTeamMember {
  updateTeamMember: UpdateTeamMember_updateTeamMember | null;
}

export interface UpdateTeamMemberVariables {
  id: string;
  fullName: string;
  companyId: string;
  role: string;
}
