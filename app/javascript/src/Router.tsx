import HomePage from './HomePage';
import LoadingFallback from './LoadingFallback';
import NotFoundPage from './NotFoundPage';
import React, {lazy, Suspense} from 'react';
import {Router as ReachRouter} from '@reach/router';

const SignInPage = lazy(() => import('./SignInPage'));
const Dashboard = (props: {path?: string}) => <div>Dashboard</div>;

export default function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReachRouter>
        <HomePage path="/" />
        <SignInPage path="/signin" />
        <Dashboard path="/dashboard" />
        <NotFoundPage default />
      </ReachRouter>
    </Suspense>
  );
}
