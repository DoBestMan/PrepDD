/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignUpUser
// ====================================================

export interface SignUpUser_signUpUser_user_ownedCompanies {
  __typename: "Company";
  id: string;
  name: string;
}

export interface SignUpUser_signUpUser_user_companies {
  __typename: "Company";
  id: string;
  name: string;
  logoUrl: string | null;
}

export interface SignUpUser_signUpUser_user_teams {
  __typename: "Team";
  id: string;
  companyId: string;
  name: string;
}

export interface SignUpUser_signUpUser_user_roles {
  __typename: "RolesUser";
  id: string;
  name: string;
  companyId: string;
}

export interface SignUpUser_signUpUser_user {
  __typename: "User";
  id: string;
  email: string;
  fullName: string;
  displayName: string | null;
  profileUrl: string | null;
  lastViewedCompanyId: string | null;
  ownedCompanies: SignUpUser_signUpUser_user_ownedCompanies[] | null;
  companies: SignUpUser_signUpUser_user_companies[] | null;
  teams: SignUpUser_signUpUser_user_teams[] | null;
  roles: SignUpUser_signUpUser_user_roles[] | null;
}

export interface SignUpUser_signUpUser_errors {
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

export interface SignUpUser_signUpUser {
  __typename: "SignUpUserPayload";
  user: SignUpUser_signUpUser_user | null;
  errors: SignUpUser_signUpUser_errors[];
  success: boolean;
}

export interface SignUpUser {
  signUpUser: SignUpUser_signUpUser | null;
}

export interface SignUpUserVariables {
  fullName: string;
  email: string;
  password: string;
  companyName: string;
  socialLogin: boolean;
  provider: string;
  tokenID: string;
  uuID: string;
}
