import LoadingFallback from '../../components/LoadingFallback';
import NotFoundPage from '../../components/NotFoundPage';
import React, {lazy, Suspense} from 'react';
import {Router as ReachRouter} from '@reach/router';

const AuthRoutes = lazy(() => import('./auth'));
const AppRoutes = lazy(() => import('./app'));

export default function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReachRouter>
        <AuthRoutes path="/*" />
        <AppRoutes path="/app/*" />
        <NotFoundPage default />
      </ReachRouter>
    </Suspense>
  );
}
