/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllTemplates
// ====================================================

export interface AllTemplates_templateLists_requesterCompany_owner {
  __typename: "User";
  fullName: string;
}

export interface AllTemplates_templateLists_requesterCompany {
  __typename: "Company";
  id: string;
  name: string;
  logoUrl: string | null;
  owner: AllTemplates_templateLists_requesterCompany_owner;
}

export interface AllTemplates_templateLists_responderCompany {
  __typename: "Company";
  id: string;
  name: string;
  logoUrl: string | null;
}

export interface AllTemplates_templateLists_tasks {
  __typename: "Task";
  id: string;
  name: string | null;
  section: string | null;
  description: string | null;
  priority: string | null;
  status: string | null;
}

export interface AllTemplates_templateLists {
  __typename: "List";
  id: string;
  name: string | null;
  isTemplate: boolean | null;
  isPublicTemplate: boolean | null;
  requesterCompany: AllTemplates_templateLists_requesterCompany | null;
  responderCompany: AllTemplates_templateLists_responderCompany | null;
  tasks: AllTemplates_templateLists_tasks[] | null;
}

export interface AllTemplates {
  /**
   * All Available lists
   */
  templateLists: AllTemplates_templateLists[];
}
