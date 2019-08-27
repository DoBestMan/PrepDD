import * as React from 'react'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'unfetch'
import { mount } from 'enzyme'
import TeamManagementPage from '../TeamManagement'
import LoadingFallback from '../../../components/LoadingFallback'

function getCSRFToken(): string {
  const el = document.querySelector('meta[name="csrf-token"]')
  return (el && el.getAttribute('content')) || ''
}

const link = createHttpLink({
  fetch, 
  credentials: 'same-origin',
  headers: {
    'X-CSRF-Token': getCSRFToken(),
  },
})

describe('Team Management Page', () => {

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })

  it('renders LoadingFallback component', () => {
    const wrapper = mount(
      <ApolloProvider client={client}>
        <TeamManagementPage />
      </ApolloProvider>
    )
    expect(wrapper.find(LoadingFallback).length).toBe(1)
  })

  // it('renders Toolbar component', async () => {
  //   const wrapper = renderer.create(
  //     <ApolloProvider client={client}>
  //       <MockedProvider mocks={[]} addTypename={false}>
  //         <TeamManagementPage />
  //       </MockedProvider>        
  //     </ApolloProvider>
  //   )
  //   await wait(0)
  //   expect(wrapper).toContain(<Paper />)
  // })

  // it('renders Toolbar component', async () => {
  //   const wrapper = mount(
  //     <ApolloProvider client={client}>
  //       <TeamManagementPage />
  //     </ApolloProvider>
  //   )
  //   await wait(0)
  //   expect(wrapper.find(Searchbar).length).toBe(0)
  // })
})