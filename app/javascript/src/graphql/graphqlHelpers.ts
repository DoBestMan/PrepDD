import {gql} from 'apollo-boost';
import {useMutation} from 'react-apollo';
import {DocumentNode} from 'graphql';
import {MutationTuple} from 'react-apollo';

export {gql};

export function createMutationHook<TData, TVariables>(
  mutation: DocumentNode
): (variables: TVariables) => MutationTuple<TData, TVariables> {
  return function(variables) {
    return useMutation(mutation, {variables});
  };
}
