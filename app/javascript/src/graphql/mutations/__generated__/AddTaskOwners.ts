/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddTaskOwners
// ====================================================

export interface AddTaskOwners_addTaskOwners_errors {
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

export interface AddTaskOwners_addTaskOwners_task_userOwners {
  __typename: "User";
  id: string;
  fullName: string;
}

export interface AddTaskOwners_addTaskOwners_task_teamOwners {
  __typename: "Task";
  id: string;
  name: string | null;
}

export interface AddTaskOwners_addTaskOwners_task_reviewers {
  __typename: "User";
  id: string;
  fullName: string;
}

export interface AddTaskOwners_addTaskOwners_task {
  __typename: "Task";
  id: string;
  name: string | null;
  priority: string | null;
  status: string | null;
  dueDate: string | null;
  updatedAt: string;
  userOwners: AddTaskOwners_addTaskOwners_task_userOwners[] | null;
  teamOwners: AddTaskOwners_addTaskOwners_task_teamOwners[] | null;
  reviewers: AddTaskOwners_addTaskOwners_task_reviewers[] | null;
}

export interface AddTaskOwners_addTaskOwners {
  __typename: "AddTaskOwnersPayload";
  errors: AddTaskOwners_addTaskOwners_errors[];
  success: boolean;
  task: AddTaskOwners_addTaskOwners_task;
}

export interface AddTaskOwners {
  addTaskOwners: AddTaskOwners_addTaskOwners | null;
}

export interface AddTaskOwnersVariables {
  taskID: string;
  userOwners?: string[] | null;
  userReviewers?: string[] | null;
  teamOwners?: string[] | null;
  teamReviewers?: string[] | null;
}
