import idx from 'idx';
import {useEffect} from 'react';
import {navigate} from '@reach/router';
import {useCurrentUser, User} from '../graphql/queries/CurrentUser';

function createCurrentUserLoadedHook(
  onLoadComplete: (currentUser: User | void | null) => void
): () => void {
  return function() {
    const {loading, data} = useCurrentUser({});
    const currentUser = idx(data, data => data.currentUser.user);

    useEffect(() => {
      if (loading) {
        return;
      }
      onLoadComplete(currentUser);
    }, [loading, currentUser]);
  };
}

export const useRequireSignIn = createCurrentUserLoadedHook(currentUser => {
  if (!currentUser) {
    console.log('must be signed in... redirecting to /signin');
    navigate('/signin');
  }
});

export const useRequireGuest = createCurrentUserLoadedHook(currentUser => {
  if (currentUser) {
    console.log('already signed in... redirecting to /dashboard');
    navigate('/dashboard');
  }
});
