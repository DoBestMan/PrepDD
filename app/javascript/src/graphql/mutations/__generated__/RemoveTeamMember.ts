/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveTeamMember
// ====================================================

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
