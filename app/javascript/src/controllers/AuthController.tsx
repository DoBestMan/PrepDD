import idx from 'idx';
import React, {useCallback, useEffect, useState} from 'react';

import {gql} from 'apollo-boost';
import {Location, redirectTo} from '@reach/router';
import {useQuery} from 'react-apollo';

const CURRENT_USER = gql`
  {
    currentUser {
      id
      user {
        id
        fullName
        email
      }
    }
  }
`;

function InnerAuthController(props: {location: {pathname: string}}) {
  const {loading, data} = useQuery(CURRENT_USER);
  const currentUser = idx(data, data => data.currentUser.user);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (currentUser) {
      // redirectTo('/dashboard');
    }
  }, [loading, currentUser]);

  console.log('loading', loading);
  console.log('currentUser', currentUser);
  console.log('location', props.location.pathname);

  return null;
}

export default function AuthController() {
  return <Location>{props => <InnerAuthController {...props} />}</Location>;
}
