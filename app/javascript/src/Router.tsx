import SignUpPage from './SignUpPage';
import LoadingFallback from './LoadingFallback';
import NotFoundPage from './NotFoundPage';
import AuthController from './controllers/AuthController';
import React, {lazy, Suspense} from 'react';
import {Router as ReachRouter} from '@reach/router';

const SignInPage = lazy(() => import('./SignInPage'));
const ForgotPasswordPage = lazy(() => import('./ForgotPasswordPage'));
const DashboardPage = lazy(() => import('./DashboardPage'));

export default function Router() {
  return (
    <>
      <AuthController />
      <Suspense fallback={<LoadingFallback />}>
        <ReachRouter>
          <SignUpPage path="/" />
          <SignInPage path="/signin" />
          <ForgotPasswordPage path="/forgot" />
          <DashboardPage path="/dashboard" />
          <NotFoundPage default />
        </ReachRouter>
      </Suspense>
    </>
  );
}
