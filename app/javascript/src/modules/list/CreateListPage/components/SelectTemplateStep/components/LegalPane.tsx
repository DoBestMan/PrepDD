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

interface LegalPaneProps {
  value?: number;
  index?: number;
}

export default function LegalPane(props: LegalPaneProps) {
  const {value, index} = props;
  const classes = useStyles();

  return (
    <Paper
      className={clsx(classes.root, value !== index && classes.invisible)}
      aria-labelledby="Legal"
      elevation={0}
    >
      <h1>Legal</h1>
    </Paper>
  );
}
