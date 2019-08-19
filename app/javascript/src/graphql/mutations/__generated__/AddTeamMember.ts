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

export interface AddTeamMember_addTeamMember {
  __typename: "AddTeamMemberPayload";
  errors: AddTeamMember_addTeamMember_errors[];
  success: boolean;
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
