/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CompanyDetails
// ====================================================

export interface CompanyDetails_company_teams {
  __typename: "Team";
  id: string;
  name: string;
}

export interface CompanyDetails_company_users_companies {
  __typename: "Company";
  id: string;
  name: string;
}

export interface CompanyDetails_company_users_teams {
  __typename: "Team";
  id: string;
  name: string;
}

export interface CompanyDetails_company_users {
  __typename: "User";
  id: string;
  fullName: string;
  companies: CompanyDetails_company_users_companies[] | null;
  teams: CompanyDetails_company_users_teams[] | null;
}

export interface CompanyDetails_company {
  __typename: "Company";
  id: string;
  name: string;
  teams: CompanyDetails_company_teams[] | null;
  users: CompanyDetails_company_users[] | null;
}

export interface CompanyDetails {
  /**
   * Find a company by id
   */
  company: CompanyDetails_company;
}

export interface CompanyDetailsVariables {
  id: string;
}
