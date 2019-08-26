/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CompanyUsers
// ====================================================

export interface CompanyUsers_companyUsers_company_teams {
  __typename: "Team";
  id: string;
  name: string;
}

export interface CompanyUsers_companyUsers_company {
  __typename: "Company";
  id: string;
  name: string;
  teams: CompanyUsers_companyUsers_company_teams[];
}

export interface CompanyUsers_companyUsers_users_roles {
  __typename: "RolesUser";
  id: string;
  name: string;
}

export interface CompanyUsers_companyUsers_users_teams {
  __typename: "Team";
  id: string;
  name: string;
  companyId: string;
}

export interface CompanyUsers_companyUsers_users_companies {
  __typename: "Company";
  id: string;
  name: string;
}

export interface CompanyUsers_companyUsers_users {
  __typename: "User";
  id: string;
  fullName: string;
  profileUrl: string | null;
  roles: CompanyUsers_companyUsers_users_roles[] | null;
  teams: CompanyUsers_companyUsers_users_teams[] | null;
  companies: CompanyUsers_companyUsers_users_companies[] | null;
}

export interface CompanyUsers_companyUsers {
  __typename: "CompanyUsers";
  company: CompanyUsers_companyUsers_company;
  users: CompanyUsers_companyUsers_users[] | null;
}

export interface CompanyUsers {
  /**
   * Return details of a user
   */
  companyUsers: CompanyUsers_companyUsers;
}

export interface CompanyUsersVariables {
  companyId: string;
  teamId?: string | null;
  limit?: number | null;
  offset?: number | null;
}
