import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ManagementPage from '../team';

export default function Router() {
  return (
    <Switch>
      <Route exact path="/app/team/" component={ManagementPage} />
    </Switch>
  );
}
