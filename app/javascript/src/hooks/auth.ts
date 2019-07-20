import idx from 'idx';
import React, {useCallback, useEffect, useState} from 'react';
import {gql} from 'apollo-boost';
import {Location, redirectTo, navigate} from '@reach/router';
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

function useCurrentUserLoaded(onLoadComplete) {
  const {loading, data} = useQuery(CURRENT_USER);
  const currentUser = idx(data, data => data.currentUser.user);

  useEffect(() => {
    if (loading) {
      return;
    }
    onLoadComplete(currentUser);
  }, [loading, currentUser]);
}

export function useRequireSignIn() {
  useCurrentUserLoaded(currentUser => {
    if (!currentUser) {
      console.log('must be signed in... redirecting to /signin');
      navigate('/signin');
    }
  });
}

export function useRequireGuest() {
  useCurrentUserLoaded(currentUser => {
    if (currentUser) {
      console.log('already signed in... redirecting to /dashboard');
      navigate('/dashboard');
    }
  });
}
