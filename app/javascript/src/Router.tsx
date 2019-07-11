import SignUpPage from './SignUpPage';
import LoadingFallback from './LoadingFallback';
import NotFoundPage from './NotFoundPage';
import React, {lazy, Suspense} from 'react';
import {Router as ReachRouter} from '@reach/router';

const SignInPage = lazy(() => import('./SignInPage'));
const ForgotPasswordPage = lazy(() => import('./ForgotPasswordPage'));
const DashboardPage = lazy(() => import('./DashboardPage'));
const UserProfile = lazy(() => import('./user/UserProfile'));
const TeamManagement = lazy(() => import('./team/TeamManagement'));

export default function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReachRouter>
        <SignUpPage path="/" />
        <SignInPage path="/signin" />
        <ForgotPasswordPage path="/forgot" />
        <DashboardPage path="/dashboard" />
        <UserProfile path="/user/profile" />
        <UserProfile path="/team/management" />
        <NotFoundPage default />
      </ReachRouter>
    </Suspense>
  );
}
