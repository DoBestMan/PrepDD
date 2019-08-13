/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCompany
// ====================================================

export interface UpdateCurrentUser_user {
  __typename: "UpdateCurrentUser";
  fullName: string;
  displayName: string;
  email: string;
}

export interface UpdateCurrentUser {
  user: UpdateCurrentUser_user | null;
}

export interface UpdateCurrentUserVariables_user {
  __typename: "UpdateCurrentUserVariables"
  fullName: string;
  displayName: string;
  email: string;
}

export interface UpdateCurrentUserVariables {
  user: UpdateCurrentUserVariables_user | null;
}