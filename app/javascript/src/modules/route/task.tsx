import React from 'react';
import {Switch, Route} from 'react-router-dom';
import TaskPage from '../task/TaskPage';

export default function TaskRoute() {
  return (
    <Switch>
      <Route exact path="/app/tasks/" component={TaskPage} />
    </Switch>
  );
}
