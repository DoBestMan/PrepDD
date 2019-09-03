import React, {lazy, Suspense} from 'react';
import {
  BrowserRouter, 
  Switch,
  Route,
  Link, 
  Redirect, 
} from 'react-router-dom';

import LoadingFallback from '../common/LoadingFallback';
import NotFoundPage from '../common/NotFoundPage';
import CreateListPage from '../list/CreateListPage';
import CreateTaskPage from '../task/CreateTaskPage';

import {useGlobalState} from '../../store';

const AuthRoutes = lazy(() => import('./auth'));
const AppRoutes = lazy(() => import('./app'));

const PrivateRoute = (props: any) => {
  const {component: Component, ...rest} = props;
  const {state} = useGlobalState();
  const isAuthenticated = state.currentUser.email ? true : false;

  return (
    <Route
      {...rest}
      render={(props: any) => 
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin', 
              state: {from: props.location}
            }}
          />
        )
      }
    />
  )
}

export default function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/app" component={AppRoutes} />
          <PrivateRoute path="/create/list" component={CreateListPage} />
          <PrivateRoute path="/create/task" component={CreateTaskPage} />
          <Route path="/" component={AuthRoutes} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

