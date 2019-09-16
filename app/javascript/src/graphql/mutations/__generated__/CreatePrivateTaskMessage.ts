/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePrivateTaskMessage
// ====================================================

export interface CreatePrivateTaskMessage_createTaskMessages_message_user {
  __typename: "User";
  fullName: string;
}

export interface CreatePrivateTaskMessage_createTaskMessages_message {
  __typename: "TaskMessage";
  id: string;
  message: string;
  createdAt: string;
  user: CreatePrivateTaskMessage_createTaskMessages_message_user;
}

export interface CreatePrivateTaskMessage_createTaskMessages {
  __typename: "CreateTaskMessagesPayload";
  success: boolean;
  message: CreatePrivateTaskMessage_createTaskMessages_message | null;
}

export interface CreatePrivateTaskMessage {
  createTaskMessages: CreatePrivateTaskMessage_createTaskMessages | null;
}

export interface CreatePrivateTaskMessageVariables {
  taskId: string;
  message: string;
}
