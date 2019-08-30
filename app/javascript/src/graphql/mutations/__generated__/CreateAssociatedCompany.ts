/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateAssociatedCompany
// ====================================================

export interface CreateAssociatedCompany_createAssociatedCompany_company {
  __typename: "Company";
  id: string;
  name: string;
  logoUrl: string | null;
}

export interface CreateAssociatedCompany_createAssociatedCompany_errors {
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

export interface CreateAssociatedCompany_createAssociatedCompany {
  __typename: "CreateAssociatedCompanyPayload";
  company: CreateAssociatedCompany_createAssociatedCompany_company | null;
  errors: CreateAssociatedCompany_createAssociatedCompany_errors[];
  success: boolean;
}

export interface CreateAssociatedCompany {
  createAssociatedCompany: CreateAssociatedCompany_createAssociatedCompany | null;
}

export interface CreateAssociatedCompanyVariables {
  companyId: string;
  ownerEmail: string;
  newCompanyName: string;
  isParent?: boolean | null;
  isBroker?: boolean | null;
}
