import LoadingFallback from './LoadingFallback';
import NotFoundPage from './NotFoundPage';
import React, {lazy, Suspense} from 'react';
import {Router as ReachRouter} from '@reach/router';

const SignUpPage = lazy(() => import('./SignUpPage'));
const SignInPage = lazy(() => import('./SignInPage'));
const ForgotPasswordPage = lazy(() => import('./ForgotPasswordPage'));
const DashboardPage = lazy(() => import('./DashboardPage'));
const UserProfile = lazy(() => import('./user/UserProfile'));
const TeamManagement = lazy(() => import('./team/TeamManagement'));
const CompanySubscription = lazy(() => import('./company/CompanySubscription'));
const CompanySettings = lazy(() => import('./company/CompanySettings'));

export default function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReachRouter>
        <SignUpPage path="/" />
        <SignInPage path="/signin" />
        <ForgotPasswordPage path="/forgot" />
        <DashboardPage path="/dashboard" />
        <UserProfile path="/user/profile" />
        <TeamManagement path="/team/management" />
        <CompanySubscription path="/company/subscription" />
        <CompanySettings path="/company/settings" />
        <NotFoundPage default />
      </ReachRouter>
    </Suspense>
  );
}
