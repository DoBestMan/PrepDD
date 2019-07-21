import {gql} from 'apollo-boost';
import {useQuery, useMutation} from 'react-apollo';
import {DocumentNode} from 'graphql';
import {QueryResult, MutationTuple} from 'react-apollo';

export {gql};

export function createQueryHook<TData, TVariables>(
  query: DocumentNode
): (variables: TVariables) => QueryResult<TData, TVariables> {
  return function(variables) {
    return useQuery(query, {variables});
  };
}

export function createMutationHook<TData, TVariables>(
  mutation: DocumentNode
): (variables: TVariables) => MutationTuple<TData, TVariables> {
  return function(variables) {
    return useMutation(mutation, {variables});
  };
}
