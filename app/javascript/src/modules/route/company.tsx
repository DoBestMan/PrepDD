import React from 'react';
import {Switch, Route} from 'react-router-dom';
import SubscriptionPage from '../company/CompanySubscription';
import SettingsPage from '../company';

export default function CompanyRoute() {
  return (
    <Switch>
      <Route exact path="/app/company/" component={SettingsPage} />
    </Switch>
  );
}
