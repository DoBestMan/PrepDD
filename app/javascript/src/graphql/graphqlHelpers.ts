import {gql, ApolloError} from 'apollo-boost';
import {useQuery, useMutation} from 'react-apollo';
import {DocumentNode} from 'graphql';
import {QueryResult, MutationTuple} from 'react-apollo';

export {gql, useQuery};

export function createQueryHook<TData, TVariables>(
  query: DocumentNode
): (variables: TVariables) => QueryResult<TData, TVariables> {
  return function(variables) {
    return useQuery(query, {variables});
  };
}

export function createMutationHook<TData, TVariables>(
  mutation: DocumentNode
): (
  variables: TVariables,
  onCompleted?: (data: TData) => void,
  onError?: (error: ApolloError) => void, 
) => MutationTuple<TData, TVariables> {
  return function(variables) {
    return useMutation(mutation, {
      variables
    });
  };
}
