/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CompanySettings
// ====================================================

export interface CompanySettings_company_parents {
  __typename: "Company";
  id: string;
  name: string;
  logoUrl: string | null;
}

export interface CompanySettings_company_brokers {
  __typename: "Company";
  id: string;
  name: string;
  logoUrl: string | null;
}

export interface CompanySettings_company_subscription {
  __typename: "Subscription";
  id: string;
  maxUsers: string | null;
  maxStorage: string | null;
}

export interface CompanySettings_company {
  __typename: "Company";
  id: string;
  name: string;
  logoUrl: string | null;
  parents: CompanySettings_company_parents[] | null;
  brokers: CompanySettings_company_brokers[] | null;
  totalUsers: number | null;
  totalStorage: number | null;
  subscription: CompanySettings_company_subscription | null;
  autoPdf: boolean | null;
  autoWatermark: boolean | null;
  previewOnly: boolean | null;
}

export interface CompanySettings {
  /**
   * Find a company by id
   */
  company: CompanySettings_company;
}

export interface CompanySettingsVariables {
  id: string;
}
