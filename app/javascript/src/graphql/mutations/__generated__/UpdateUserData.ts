/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserData
// ====================================================

export interface UpdateUserData_updateUserData_errors {
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

export interface UpdateUserData_updateUserData {
  __typename: "UpdateUserDataPayload";
  errors: UpdateUserData_updateUserData_errors[];
  success: boolean;
}

export interface UpdateUserData {
  updateUserData: UpdateUserData_updateUserData | null;
}

export interface UpdateUserDataVariables {
  email: string;
  fullName: string;
  displayName: string;
  lastViewedCompanyId?: string | null;
}
