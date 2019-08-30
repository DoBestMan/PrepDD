/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCompany
// ====================================================

export interface UpdateCompany_updateCompanySettings_errors {
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

export interface UpdateCompany_updateCompanySettings_company_parents {
  __typename: "Company";
  id: string;
  name: string;
  logoUrl: string | null;
}

export interface UpdateCompany_updateCompanySettings_company_brokers {
  __typename: "Company";
  id: string;
  name: string;
  logoUrl: string | null;
}

export interface UpdateCompany_updateCompanySettings_company_subscription {
  __typename: "Subscription";
  id: string;
  maxUsers: string | null;
  maxStorage: string | null;
}

export interface UpdateCompany_updateCompanySettings_company {
  __typename: "Company";
  id: string;
  name: string;
  logoUrl: string | null;
  parents: UpdateCompany_updateCompanySettings_company_parents[] | null;
  brokers: UpdateCompany_updateCompanySettings_company_brokers[] | null;
  totalUsers: number | null;
  totalStorage: number | null;
  subscription: UpdateCompany_updateCompanySettings_company_subscription | null;
  autoPdf: boolean | null;
  autoWatermark: boolean | null;
  previewOnly: boolean | null;
}

export interface UpdateCompany_updateCompanySettings {
  __typename: "UpdateCompanySettingsPayload";
  errors: UpdateCompany_updateCompanySettings_errors[];
  success: boolean;
  company: UpdateCompany_updateCompanySettings_company;
}

export interface UpdateCompany {
  updateCompanySettings: UpdateCompany_updateCompanySettings | null;
}

export interface UpdateCompanyVariables {
  id: string;
  name: string;
  parentId?: string | null;
  brokerId?: string | null;
  deleteParentId?: string | null;
  deleteBrokerId?: string | null;
  autoPdf: boolean;
  autoWatermark: boolean;
  previewOnly: boolean;
}
