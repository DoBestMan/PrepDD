/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllTemplates
// ====================================================

export interface AllTemplates_templateLists_tasks {
  __typename: "Task";
  id: string;
  name: string | null;
  description: string | null;
  priority: string | null;
  status: string | null;
}

export interface AllTemplates_templateLists {
  __typename: "List";
  id: string;
  name: string | null;
  tasks: AllTemplates_templateLists_tasks[] | null;
}

export interface AllTemplates {
  /**
   * All Available lists
   */
  templateLists: AllTemplates_templateLists[];
}
