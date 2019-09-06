/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddListOwner
// ====================================================

export interface AddListOwner_addListOwner_errors {
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

export interface AddListOwner_addListOwner {
  __typename: "AddListOwnerPayload";
  errors: AddListOwner_addListOwner_errors[];
  success: boolean;
}

export interface AddListOwner {
  addListOwner: AddListOwner_addListOwner | null;
}

export interface AddListOwnerVariables {
  listId: string;
  companyId: string;
  userEmails?: string[] | null;
  teamIds?: string[] | null;
}
