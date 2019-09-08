import React from 'react';
import clsx from 'clsx';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

import TaskToolbar from './components/TaskToolbar';
import TaskTable from './components/TaskTable';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {},
  })
);

export default function TaskPage() {
  const classes  = useStyles();

  return (
    <div className={classes.root}>
      <TaskToolbar />
      <TaskTable />
    </div>
  )
}