/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CompanySettings
// ====================================================

export interface CompanySettings_company_parent {
  __typename: "Company";
  id: string;
  name: string;
}

export interface CompanySettings_company_broker {
  __typename: "Company";
  id: string;
  name: string;
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
  parent: CompanySettings_company_parent | null;
  broker: CompanySettings_company_broker | null;
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
