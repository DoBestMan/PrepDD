/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserTasks
// ====================================================

export interface UserTasks_userTasks_userOwners {
  __typename: "User";
  id: string;
  email: string;
  fullName: string;
  profileUrl: string | null;
}

export interface UserTasks_userTasks_teamOwners {
  __typename: "Team";
  id: string;
  name: string;
}

export interface UserTasks_userTasks_userReviewers {
  __typename: "User";
  id: string;
  email: string;
  fullName: string;
  profileUrl: string | null;
}

export interface UserTasks_userTasks_teamReviewers {
  __typename: "Team";
  id: string;
  name: string;
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
  userReviewers: UserTasks_userTasks_userReviewers[] | null;
  teamReviewers: UserTasks_userTasks_teamReviewers[] | null;
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
