import LoadingFallback from '../../components/LoadingFallback';
import NotFoundPage from '../../components/NotFoundPage';
import React, {lazy, Suspense} from 'react';
import {Router as ReachRouter, Redirect} from '@reach/router';
import {isAuthenticated} from '../../hooks/auth';
import CreateTaskPage from '../task/CreateTaskPage';

const AuthRoutes = lazy(() => import('./auth'));
const AppRoutes = lazy(() => import('./app'));

export default function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReachRouter>
        <AuthRoutes path="/*" />
        {isAuthenticated && <AppRoutes path="/app/*" />}
        <NotFoundPage default />
      </ReachRouter>
      {/* <CreateTaskPage /> */}
    </Suspense>
  );
}
