/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserLists
// ====================================================

export interface UserLists_userLists_lists_sections {
  __typename: "TaskSection";
  id: string;
  name: string | null;
}

export interface UserLists_userLists_lists {
  __typename: "List";
  id: string;
  name: string | null;
  sections: UserLists_userLists_lists_sections[] | null;
}

export interface UserLists_userLists {
  __typename: "UserList";
  id: string;
  lists: UserLists_userLists_lists[] | null;
}

export interface UserLists {
  /**
   * All users lists & tasks in current company
   */
  userLists: UserLists_userLists;
}
