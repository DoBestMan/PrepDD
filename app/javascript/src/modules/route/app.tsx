import LoadingFallback from '../../components/LoadingFallback';
import React, {lazy, Suspense} from 'react';
import {Router as ReachRouter} from '@reach/router';
import Layout from '../layout';

const DashboardPage = lazy(() => import('../dashboard'));
const UserRoutes = lazy(() => import('./user'));
const CompanyRoutes = lazy(() => import('./company'));
const TeamRoutes = lazy(() => import('./team'));
const ListRoutes = lazy(() => import('./list'));

export default function Router() {
  console.log('asdfsd');
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Layout>
        <ReachRouter>
          <UserRoutes path="/user/*" />
          <CompanyRoutes path="/company/*" />
          <TeamRoutes path="/team/*" />
          <ListRoutes path="/list/*" />
          <DashboardPage path="/" />
        </ReachRouter>
      </Layout>
    </Suspense>
  );
}
