import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import Header from './components/Header';
import Body from './components/Body';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

export default function CreateTaskPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Body />
    </div>
  );
}
