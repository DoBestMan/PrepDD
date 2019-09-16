import React from 'react';
import clsx from 'clsx';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Typography, 
} from '@material-ui/core';

import Panel from '../../../../common/Panel';
import SingleTask from './components/SingleTask';
import MultipleTasks from './components/MultipleTasks';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      padding: '0px calc((100% - 1080px) / 2) 0px calc((100% - 1080px) / 2)',  
    },
    flex: {
      display: 'flex', 
      alignItems: 'center', 
    },
  })
);

const labels = ['Single Task', 'Multiple Tasks'];

export default function Body() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2">Add Files</Typography>
      <Panel title="Add Files" labels={labels}>
        <SingleTask />
        <MultipleTasks />
      </Panel>
    </div>
  );
};  
