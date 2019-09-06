/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InviteListOwner
// ====================================================

export interface InviteListOwner_inviteListOwner_errors {
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

export interface InviteListOwner_inviteListOwner {
  __typename: "InviteListOwnerPayload";
  errors: InviteListOwner_inviteListOwner_errors[];
  success: boolean;
}

export interface InviteListOwner {
  inviteListOwner: InviteListOwner_inviteListOwner | null;
}

export interface InviteListOwnerVariables {
  listId: string;
  companyId: string;
  userName: string;
  userEmail: string;
}
