import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Paper, Typography, Select, MenuItem} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: '36px',
    },
    invisible: {
      display: 'none',
    },
    title: {
      fontFamily: 'Montserrat',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2C2C2C',
    },
    settings: {
      display: 'flex',
    },
  })
);

interface NotificationPaneProps {
  value?: number;
  index?: number;
}

export default function NotificationPane(props: NotificationPaneProps) {
  const {value, index} = props;
  const classes = useStyles();

  return (
    <Paper
      className={clsx(classes.root, value !== index && classes.invisible)}
      aria-labelledby="Notification Settings"
      elevation={0}
    >
      <Typography className={classes.title} variant="h2">
        Reviewer Pane
      </Typography>
    </Paper>
  );
}
