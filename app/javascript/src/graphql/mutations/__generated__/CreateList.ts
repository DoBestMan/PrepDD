/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TaskAttributes } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateList
// ====================================================

export interface CreateList_createList_list {
  __typename: "List";
  id: string;
  name: string | null;
}

export interface CreateList_createList_errors {
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

export interface CreateList_createList {
  __typename: "CreateListPayload";
  list: CreateList_createList_list | null;
  errors: CreateList_createList_errors[];
  success: boolean;
}

export interface CreateList {
  createList: CreateList_createList | null;
}

export interface CreateListVariables {
  name: string;
  description?: string | null;
  requesterId: string;
  responderId: string;
  isTemplate: boolean;
  isPublicTemplate: boolean;
  tasks?: TaskAttributes[] | null;
}
