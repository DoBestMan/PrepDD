import ApolloClient from 'apollo-client';
import React from 'react';
import {render} from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ThemeProvider} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './containers/app';
import theme from './config/theme';

function getCSRFToken(): string {
  const el = document.querySelector('meta[name="csrf-token"]');
  return (el && el.getAttribute('content')) || '';
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
    connectToDevTools: true,
  });

  render(
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ApolloProvider>,
    document.body.appendChild(document.createElement('div'))
  );
});
