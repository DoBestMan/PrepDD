/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: publicTaskMessages
// ====================================================

export interface publicTaskMessages_publicTaskMessages_user {
  __typename: "User";
  fullName: string;
}

export interface publicTaskMessages_publicTaskMessages {
  __typename: "TaskMessage";
  message: string;
  user: publicTaskMessages_publicTaskMessages_user;
  createdAt: string;
}

export interface publicTaskMessages {
  /**
   * A separate query to retrieve public messages
   */
  publicTaskMessages: publicTaskMessages_publicTaskMessages[];
}

export interface publicTaskMessagesVariables {
  taskId: string;
}
