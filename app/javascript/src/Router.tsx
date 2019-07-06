import SignUpPage from './SignUpPage';
import LoadingFallback from './LoadingFallback';
import NotFoundPage from './NotFoundPage';
import React, {lazy, Suspense} from 'react';
import {Router as ReachRouter} from '@reach/router';

const Dashboard = (props: {path?: string}) => <div>Dashboard</div>;
const SignInPage = lazy(() => import('./SignInPage'));
const PasswordResetPage = lazy(() => import('./PasswordResetPage'));

export default function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReachRouter>
        <SignUpPage path="/" />
        <SignInPage path="/signin" />
        <PasswordResetPage path="/password_reset" />
        <Dashboard path="/dashboard" />
        <NotFoundPage default />
      </ReachRouter>
    </Suspense>
  );
}
