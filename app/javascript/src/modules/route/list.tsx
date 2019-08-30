import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ListPage from '../list';

export default function ListRoute() {
  return (
    <Switch>
      <Route exact path="/app/list/" component={ListPage} />
    </Switch>
  );
}
