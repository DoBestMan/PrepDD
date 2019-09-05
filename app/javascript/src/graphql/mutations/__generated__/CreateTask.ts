/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TaskAttributes } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateTask
// ====================================================

export interface CreateTask_createTask_errors {
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

export interface CreateTask_createTask {
  __typename: "CreateTaskPayload";
  errors: CreateTask_createTask_errors[];
  success: boolean;
}

export interface CreateTask {
  createTask: CreateTask_createTask | null;
}

export interface CreateTaskVariables {
  listId: string;
  tasks: TaskAttributes[];
}
