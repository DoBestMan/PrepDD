/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserDetails
// ====================================================

export interface UserDetails_user_roles {
  __typename: "Role";
  id: string;
  Name: string;
}

export interface UserDetails_user_companies {
  __typename: "Company";
  id: string;
  name: string;
}

export interface UserDetails_user {
  __typename: "User";
  id: string;
  fullName: string;
  roles: UserDetails_user_roles[] | null;
  companies: UserDetails_user_companies[] | null;
}

export interface UserDetails {
  /**
   * Find a user by id
   */
  user: UserDetails_user | null;
}

export interface UserDetailsVariables {
  id: string;
}
