import * as React from 'react';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import fetch from 'unfetch';
import {mount} from 'enzyme';
import CompanySettingsPage from '../CompanySettings';
import FormPanel from '../components/FormPanel';
import UploadPanel from '../components/UploadPanel';

function getCSRFToken(): string {
  const el = document.querySelector('meta[name="csrf-token"]');
  return (el && el.getAttribute('content')) || '';
}

const link = createHttpLink({
  fetch,
  credentials: 'same-origin',
  headers: {
    'X-CSRF-Token': getCSRFToken(),
  },
});

describe('Company Settings Page', () => {
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  it('renders FormPanel without errors', () => {
    const wrapper = mount(
      <ApolloProvider client={client}>
        <CompanySettingsPage />
      </ApolloProvider>
    );
    expect(wrapper.find(FormPanel).length).toBe(1);
  });

  it('renders UploadPanel without errors', () => {
    const wrapper = mount(
      <ApolloProvider client={client}>
        <CompanySettingsPage />
      </ApolloProvider>
    );
    expect(wrapper.find(UploadPanel).length).toBe(1);
  });
});
