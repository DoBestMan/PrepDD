import ApolloClient from 'apollo-client';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import {ApolloProvider} from 'react-apollo';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

function getCSRFToken(): string {
  return document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');
}

document.addEventListener('DOMContentLoaded', () => {
  const link = createHttpLink({
    credentials: 'same-origin',
    headers: {
      'X-CSRF-Token': getCSRFToken(),
    },
  });

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  ReactDOM.render(
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>,
    document.body.appendChild(document.createElement('div'))
  );
});