import HomePage from './HomePage';
import LoadingFallback from './LoadingFallback';
import NotFoundPage from './NotFoundPage';
import React, {lazy, Suspense} from 'react';
import {Router as ReachRouter} from '@reach/router';

const SignInPage = lazy(() => import('./SignInPage'));
const Dash = (props: {path?: string}) => <div>Dash</div>;

export default function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReachRouter>
        <HomePage path="/" />
        <Dash path="/dashboard" />
        <SignInPage path="/signin" />
        <NotFoundPage default />
      </ReachRouter>
    </Suspense>
  );
}
