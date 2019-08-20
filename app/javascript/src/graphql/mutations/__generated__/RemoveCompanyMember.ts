/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveCompanyMember
// ====================================================

export interface RemoveCompanyMember_removeCompanyMember_errors {
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

export interface RemoveCompanyMember_removeCompanyMember {
  __typename: "RemoveCompanyMemberPayload";
  errors: RemoveCompanyMember_removeCompanyMember_errors[];
  success: boolean;
}

export interface RemoveCompanyMember {
  removeCompanyMember: RemoveCompanyMember_removeCompanyMember | null;
}

export interface RemoveCompanyMemberVariables {
  companyId: string;
  userId?: string | null;
  userIds?: string[] | null;
}
