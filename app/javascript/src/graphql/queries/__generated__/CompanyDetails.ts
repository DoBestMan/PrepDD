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

export interface CompanyDetails_company_users_roles {
  __typename: "RolesUser";
  id: string;
  name: string;
}

export interface CompanyDetails_company_users {
  __typename: "User";
  id: string;
  fullName: string;
  profileUrl: string | null;
  companies: CompanyDetails_company_users_companies[] | null;
  teams: CompanyDetails_company_users_teams[] | null;
  roles: CompanyDetails_company_users_roles[] | null;
}

export interface CompanyDetails_company_owner {
  __typename: "User";
  id: string;
  fullName: string;
}

export interface CompanyDetails_company {
  __typename: "Company";
  id: string;
  name: string;
  teams: CompanyDetails_company_teams[];
  users: CompanyDetails_company_users[];
  owner: CompanyDetails_company_owner;
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
