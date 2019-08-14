/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCompany
// ====================================================

export interface CreateCompany_createCompany_company {
  __typename: "Company";
  name: string;
}

export interface CreateCompany_createCompany_errors {
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

export interface CreateCompany_createCompany {
  __typename: "CreateCompanyPayload";
  company: CreateCompany_createCompany_company | null;
  errors: CreateCompany_createCompany_errors[];
  success: boolean;
}

export interface CreateCompany {
  createCompany: CreateCompany_createCompany | null;
}

export interface CreateCompanyVariables {
  name: string;
}
