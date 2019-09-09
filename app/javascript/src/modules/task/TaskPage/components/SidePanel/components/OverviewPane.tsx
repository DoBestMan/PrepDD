import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Paper} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    invisible: {
      display: 'none',
    },
  })
);

interface OverviewPaneProps {
  value?: number;
  index?: number;
}

export default function OverviewPane(props: OverviewPaneProps) {
  const {value, index} = props;
  const classes = useStyles();

  return (
    <Paper
      className={clsx(classes.root, value !== index && classes.invisible)}
      aria-labelledby="Overview"
      elevation={0}
    >
      <h1>Overview</h1>
    </Paper>
  );
}
