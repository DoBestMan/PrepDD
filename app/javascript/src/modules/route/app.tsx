import LoadingFallback from '../../components/LoadingFallback';
import React, {lazy, Suspense} from 'react';
import {Router as ReachRouter} from '@reach/router';

const Layout = lazy(() => import('../layout'));
const CompanyRoutes = lazy(() => import('./company'));
const TeamRoutes = lazy(() => import('./team'));
const UserRoutes = lazy(() => import('./user'));
const ListRoutes = lazy(() => import('./list'));

export default function Router() {
  console.log("I'm in app route");

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Layout>
        <ReachRouter>
          <CompanyRoutes path="/company/*" />
          <TeamRoutes path="/team/*" />
          <UserRoutes path="/user/*" />
          <ListRoutes path="/lists/*" />
        </ReachRouter>
      </Layout>
    </Suspense>
  );
}
