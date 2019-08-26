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

export interface UpdateTeamMember_updateTeamMember_user_companies_users_teams {
  __typename: "Team";
  id: string;
  name: string;
}

export interface UpdateTeamMember_updateTeamMember_user_companies_users {
  __typename: "User";
  id: string;
  teams: UpdateTeamMember_updateTeamMember_user_companies_users_teams[] | null;
}

export interface UpdateTeamMember_updateTeamMember_user_companies {
  __typename: "Company";
  id: string;
  name: string;
  users: UpdateTeamMember_updateTeamMember_user_companies_users[];
}

export interface UpdateTeamMember_updateTeamMember_user_roles {
  __typename: "RolesUser";
  id: string;
  name: string;
}

export interface UpdateTeamMember_updateTeamMember_user {
  __typename: "User";
  id: string;
  fullName: string;
  companies: UpdateTeamMember_updateTeamMember_user_companies[] | null;
  roles: UpdateTeamMember_updateTeamMember_user_roles[] | null;
}

export interface UpdateTeamMember_updateTeamMember {
  __typename: "UpdateTeamMemberPayload";
  success: boolean;
  errors: UpdateTeamMember_updateTeamMember_errors[];
  user: UpdateTeamMember_updateTeamMember_user;
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
