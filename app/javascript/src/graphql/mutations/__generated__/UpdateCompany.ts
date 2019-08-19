/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCompany
// ====================================================

export interface UpdateCompany_updateCompany_errors {
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

export interface UpdateCompany_updateCompany {
  __typename: "UpdateCompanyPayload";
  errors: UpdateCompany_updateCompany_errors[];
  success: boolean;
}

export interface UpdateCompany {
  updateCompany: UpdateCompany_updateCompany | null;
}

export interface UpdateCompanyVariables {
  id: string;
  name: string;
  autoPdf: boolean;
  autoWatermark: boolean;
  previewOnly: boolean;
}
