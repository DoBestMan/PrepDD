import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {}
  })
);

export default function Alert() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>

    </div>
  )
};