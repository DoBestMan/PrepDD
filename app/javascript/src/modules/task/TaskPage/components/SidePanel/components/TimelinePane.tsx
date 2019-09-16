import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Paper} from '@material-ui/core';

import Message from '../../Message';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '24px',
    },
    invisible: {
      display: 'none',
    },
    message: {
      backgroundColor: 'rgba(39, 146, 162, 0.1)',
    },
  })
);

const messages = [
  {
    from: 'Tom Hardin',
    to: 'Tom Kirby',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    time: '3 hrs',
    status: true,
  },
  {
    from: 'Tom Kirby',
    to: 'Tom Hardin',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    time: '4 hrs',
    status: false,
  },
];

interface InternalPaneProps {
  value?: number;
  index?: number;
}

export default function InternalPane(props: InternalPaneProps) {
  const {value, index} = props;
  const classes = useStyles();

  return (
    <Paper
      className={clsx(classes.root, value !== index && classes.invisible)}
      aria-labelledby="Internal"
      elevation={0}
    >
      {messages.map((message: any, index: number) => {
        return (
          <Message key={index} data={message} className={classes.message} />
        );
      })}
    </Paper>
  );
}
