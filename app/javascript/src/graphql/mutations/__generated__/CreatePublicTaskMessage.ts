/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePublicTaskMessage
// ====================================================

export interface CreatePublicTaskMessage_createTaskMessages_message_user {
  __typename: "User";
  fullName: string;
}

export interface CreatePublicTaskMessage_createTaskMessages_message {
  __typename: "TaskMessage";
  id: string;
  message: string;
  createdAt: string;
  user: CreatePublicTaskMessage_createTaskMessages_message_user;
}

export interface CreatePublicTaskMessage_createTaskMessages {
  __typename: "CreateTaskMessagesPayload";
  success: boolean;
  message: CreatePublicTaskMessage_createTaskMessages_message | null;
}

export interface CreatePublicTaskMessage {
  createTaskMessages: CreatePublicTaskMessage_createTaskMessages | null;
}

export interface CreatePublicTaskMessageVariables {
  taskId: string;
  message: string;
}
