import LoadingFallback from '../../components/LoadingFallback';
import React, {lazy, Suspense} from 'react';
import {Router as ReachRouter} from '@reach/router';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';

const CreateCompanyPage = lazy(() => import('../auth/CreateCompanyPage'));
const SignUpPage = lazy(() => import('../auth/SignUpPage'));
const SignInPage = lazy(() => import('../auth/SignInPage'));
const ForgotPasswordPage = lazy(() => import('../auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../auth/ResetPasswordPage'));

export default function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReachRouter>
        <CreateCompanyPage path="/" />
        <SignUpPage path="/signup" />
        <SignInPage path="/signin" />
        <ForgotPasswordPage path="/forgot" />
        <ResetPasswordPage path="/reset_password/:token" />
        <LinkedInPopUp path="/linkedin" />
      </ReachRouter>
    </Suspense>
  );
}
