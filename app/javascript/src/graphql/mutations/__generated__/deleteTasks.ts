/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteTasks
// ====================================================

export interface deleteTasks_deleteTasks {
  __typename: "DeleteTasksPayload";
  success: boolean;
  taskIds: string[];
}

export interface deleteTasks {
  deleteTasks: deleteTasks_deleteTasks | null;
}

export interface deleteTasksVariables {
  taskIds: string[];
}
