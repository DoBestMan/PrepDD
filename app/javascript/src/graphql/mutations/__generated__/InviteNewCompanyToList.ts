/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InviteNewCompanyToList
// ====================================================

export interface InviteNewCompanyToList_inviteNewCompanyToList_errors {
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

export interface InviteNewCompanyToList_inviteNewCompanyToList {
  __typename: "InviteNewCompanyToListPayload";
  errors: InviteNewCompanyToList_inviteNewCompanyToList_errors[];
  success: boolean;
}

export interface InviteNewCompanyToList {
  inviteNewCompanyToList: InviteNewCompanyToList_inviteNewCompanyToList | null;
}

export interface InviteNewCompanyToListVariables {
  listId: string;
  companyId: string;
  ownerEmail: string;
  newCompanyName: string;
  isRequest?: boolean | null;
  isShare?: boolean | null;
}
