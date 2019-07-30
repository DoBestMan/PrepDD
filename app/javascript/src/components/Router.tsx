import LoadingFallback from './LoadingFallback';
import NotFoundPage from './NotFoundPage';
import React, {lazy, Suspense} from 'react';
import {Router as ReachRouter} from '@reach/router';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';

const CreateCompanyPage = lazy(() => import('./auth/CreateCompanyPage'));
const SignUpPage = lazy(() => import('./auth/SignUpPage'));
const SignInPage = lazy(() => import('./auth/SignInPage'));
const ForgotPasswordPage = lazy(() => import('./auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./auth/ResetPasswordPage'));
const DashboardPage = lazy(() => import('./dashboard/DashboardPage'));
const UserProfile = lazy(() => import('./user/UserProfile'));
const TeamManagement = lazy(() => import('./team/TeamManagement'));
const CompanySubscription = lazy(() => import('./company/CompanySubscription'));
const CompanySettings = lazy(() => import('./company/CompanySettings'));

export default function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReachRouter>
        <CreateCompanyPage path="/" />
        <SignUpPage path="/signup" />
        <SignInPage path="/signin" />
        <ForgotPasswordPage path="/forgot" />
        <ResetPasswordPage path="/reset_password/:token" />
        <DashboardPage path="/dashboard" />
        <UserProfile path="/user/profile" />
        <TeamManagement path="/team/management" />
        <CompanySubscription path="/company/subscription" />
        <CompanySettings path="/company/settings" />
        <LinkedInPopUp path="/linkedin" />
        <NotFoundPage default />
      </ReachRouter>
    </Suspense>
  );
}
