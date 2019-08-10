import React from 'react';
import {Router as ReachRouter} from '@reach/router';
import ProfilePage from '../user'
import NotificationPage from '../user/UserNotification';

export default function Router(props: {path: string}) {
  return (
    <ReachRouter>
      <ProfilePage path="/" />
    </ReachRouter>
  );
}
