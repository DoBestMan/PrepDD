/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: privateTaskMessages
// ====================================================

export interface privateTaskMessages_privateTaskMessages_user {
  __typename: "User";
  fullName: string;
}

export interface privateTaskMessages_privateTaskMessages {
  __typename: "TaskMessage";
  message: string;
  user: privateTaskMessages_privateTaskMessages_user;
  createdAt: string;
}

export interface privateTaskMessages {
  /**
   * A separate query to retrieve private messages
   */
  privateTaskMessages: privateTaskMessages_privateTaskMessages[];
}

export interface privateTaskMessagesVariables {
  taskId: string;
}
