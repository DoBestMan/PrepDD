import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

import Header from './components/Header';
import Body from './components/Body';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '36px', 
    }
  })
);

export default function CreateListPage() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Header />
      <Body />
    </div>
  );
};