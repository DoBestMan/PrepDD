import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ProfilePage from '../user';

export default function UserRoute() {
  return (
    <Switch>
      <Route exact path="/app/user/" component={ProfilePage} />
    </Switch>
  );
}
