/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchCompanies
// ====================================================

export interface SearchCompanies_searchCompanies_users_companies {
  __typename: "Company";
  id: string;
  name: string;
  logoUrl: string | null;
}

export interface SearchCompanies_searchCompanies_users {
  __typename: "User";
  id: string;
  fullName: string;
  profileUrl: string | null;
  companies: SearchCompanies_searchCompanies_users_companies[] | null;
}

export interface SearchCompanies_searchCompanies_companies {
  __typename: "Company";
  id: string;
  name: string;
  logoUrl: string | null;
}

export interface SearchCompanies_searchCompanies {
  __typename: "SearchCompanies";
  users: SearchCompanies_searchCompanies_users[] | null;
  companies: SearchCompanies_searchCompanies_companies[] | null;
}

export interface SearchCompanies {
  /**
   * Find companies by user email OR Name
   */
  searchCompanies: SearchCompanies_searchCompanies;
}

export interface SearchCompaniesVariables {
  text: string;
  companyId: string;
}
