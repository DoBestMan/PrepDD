import React from 'react';
import {Router as ReachRouter} from '@reach/router';
import SubscriptionPage from '../company/CompanySubscription';
import SettingsPage from '../company/CompanySettings';

export default function Router(props: {path: string}) {
  return (
    <ReachRouter>
      <SubscriptionPage path="/subscription" />
      <SettingsPage path="/settings" />
    </ReachRouter>
  );
}
