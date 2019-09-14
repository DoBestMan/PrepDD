/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: taskMessages
// ====================================================

export interface taskMessages_task_messages_user {
  __typename: "User";
  fullName: string;
}

export interface taskMessages_task_messages {
  __typename: "TaskMessage";
  message: string;
  user: taskMessages_task_messages_user;
  createdAt: string;
}

export interface taskMessages_task {
  __typename: "Task";
  messages: taskMessages_task_messages[] | null;
}

export interface taskMessages {
  /**
   * A task details query
   */
  task: taskMessages_task;
}

export interface taskMessagesVariables {
  id: string;
}
