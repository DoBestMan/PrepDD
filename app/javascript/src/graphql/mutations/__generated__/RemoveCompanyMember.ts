/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveCompanyMember
// ====================================================

export interface RemoveCompanyMember_removeCompanyMember_errors {
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

export interface RemoveCompanyMember_removeCompanyMember_user_roles {
  __typename: "RolesUser";
  id: string;
  name: string;
  companyId: string;
}

export interface RemoveCompanyMember_removeCompanyMember_user_teams {
  __typename: "Team";
  id: string;
  name: string;
  companyId: string;
}

export interface RemoveCompanyMember_removeCompanyMember_user_companies {
  __typename: "Company";
  id: string;
  name: string;
}

export interface RemoveCompanyMember_removeCompanyMember_user {
  __typename: "User";
  id: string;
  fullName: string;
  profileUrl: string | null;
  roles: RemoveCompanyMember_removeCompanyMember_user_roles[] | null;
  teams: RemoveCompanyMember_removeCompanyMember_user_teams[] | null;
  companies: RemoveCompanyMember_removeCompanyMember_user_companies[] | null;
}

export interface RemoveCompanyMember_removeCompanyMember {
  __typename: "RemoveCompanyMemberPayload";
  errors: RemoveCompanyMember_removeCompanyMember_errors[];
  success: boolean;
  user: RemoveCompanyMember_removeCompanyMember_user | null;
}

export interface RemoveCompanyMember {
  removeCompanyMember: RemoveCompanyMember_removeCompanyMember | null;
}

export interface RemoveCompanyMemberVariables {
  companyId: string;
  userId?: string | null;
  userIds?: string[] | null;
}
