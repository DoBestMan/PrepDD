/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllRoles
// ====================================================

export interface AllRoles_roles {
  __typename: "Role";
  id: string;
  name: string;
}

export interface AllRoles {
  /**
   * Return All available roles
   */
  roles: AllRoles_roles[];
}
