
import {createMutationHook, gql} from '../graphqlHelpers';
import {
  AddTeamMember,
  AddTeamMemberVariables,
} from './__generated__/AddTeamMember';

export const useAddTeamMember = createMutationHook<
  AddTeamMember,
  AddTeamMemberVariables
  >(gql`
  mutation AddTeamMember(
    $email: String!,
    $fullName: String!,
    $role: ID!, 
    $team: String!,
    $companyId: ID!
  ) {
    addTeamMember(
      email: $email, 
      fullName: $fullName, 
      role: $role, 
      team: $team,
      companyId: $companyId
    ) {
      errors {
        path
        message
      }
      success
      user{
        id 
        fullName
        email
      }
      companies {
        id
        name
      }
      teams{
        id
        name
      }
      role{
        id
        name
      }
    }
  }
`);


