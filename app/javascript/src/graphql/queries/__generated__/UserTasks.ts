/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserTasks
// ====================================================

export interface UserTasks_userTasks_userOwners {
  __typename: "User";
  id: string;
  fullName: string;
}

export interface UserTasks_userTasks_teamOwners {
  __typename: "Task";
  id: string;
  name: string | null;
}

export interface UserTasks_userTasks_reviewers {
  __typename: "User";
  id: string;
  fullName: string;
}

export interface UserTasks_userTasks {
  __typename: "Task";
  id: string;
  name: string | null;
  priority: string | null;
  status: string | null;
  dueDate: string | null;
  updatedAt: string;
  userOwners: UserTasks_userTasks_userOwners[] | null;
  teamOwners: UserTasks_userTasks_teamOwners[] | null;
  reviewers: UserTasks_userTasks_reviewers[] | null;
}

export interface UserTasks {
  /**
   * All users lists & tasks in current company
   */
  userTasks: UserTasks_userTasks[];
}

export interface UserTasksVariables {
  listIds: string[];
  sectionIds: string[];
  offset?: number | null;
  limit?: number | null;
}
