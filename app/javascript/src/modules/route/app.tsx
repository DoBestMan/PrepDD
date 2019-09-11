import LoadingFallback from '../common/LoadingFallback';
import React, {lazy, Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';

const Layout = lazy(() => import('../layout'));
const CompanyRoutes = lazy(() => import('./company'));
const TeamRoutes = lazy(() => import('./team'));
const UserRoutes = lazy(() => import('./user'));
const ListRoutes = lazy(() => import('./list'));
const TaskRoutes = lazy(() => import('./task'));

export default function AppRoute() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Layout>
        <Switch>
          <Route exact path="/app/company" component={CompanyRoutes} />
          <Route exact path="/app/team" component={TeamRoutes} />
          <Route exact path="/app/user" component={UserRoutes} />
          <Route exact path="/app/lists" component={ListRoutes} />
          <Route exact path="/app/tasks" component={TaskRoutes} />
        </Switch>
      </Layout>
    </Suspense>
  );
}
