import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ListPage from '../list/ListPage';

export default function ListRoute() {
  return (
    <Switch>
      <Route exact path="/app/lists/" component={ListPage} />
    </Switch>
  );
}
