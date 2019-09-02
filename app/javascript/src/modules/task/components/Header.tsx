import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import CloseIcon from '@material-ui/icons/Close';

import * as cs from '../../../constants/theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      height: '90px',
      padding: '36px',
    },
    grow: {
      flexGrow: 1,
    },
    primary: {
      color: cs.COLORS.primary, 
    },
    secondary: {
      color: '#D8D8D8',
    }
  })
);

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ArrowLeftIcon className={classes.secondary} />
      <Typography variant="h4" className={classes.primary}>Back</Typography>
      <div className={classes.grow} />
      <CloseIcon className={classes.secondary} />
    </div>
  );
}
