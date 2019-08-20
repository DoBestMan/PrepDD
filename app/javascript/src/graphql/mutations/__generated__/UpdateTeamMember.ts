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

export interface UpdateTeamMember_updateTeamMember {
  __typename: "UpdateTeamMemberPayload";
  errors: UpdateTeamMember_updateTeamMember_errors[];
  success: boolean;
}

export interface UpdateTeamMember {
  updateTeamMember: UpdateTeamMember_updateTeamMember | null;
}

export interface UpdateTeamMemberVariables {
  email: string;
  fullName: string;
  companyId: string;
  role: string;
}
