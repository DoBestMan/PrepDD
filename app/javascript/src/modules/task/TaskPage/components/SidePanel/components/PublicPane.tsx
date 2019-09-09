import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper,
  Typography, 
} from '@material-ui/core';
import ClipIcon from '@material-ui/icons/AttachFile';

import * as cs from '../../../../../../constants/theme';
import Message from '../../Message';
import Alert from './Alert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    invisible: {
      display: 'none',
    },
    body: {
      borderBottom: '1px solid #D8D8D8',
      height: 'calc(100vh - 364px)',
    },
    footer: {
      padding: '16px 24px',
    },
    message: {
      backgroundColor: '#FFFFFF',
    },
    messageBox: {
      display: 'flex', 
      marginBottom: '12px',
    },
    primary: {
      color: cs.COLORS.primary, 
    },
    icon: {
      fontSize: '20px', 
      marginRight: '12px',
    }
  })
);

const messages = [
  { 
    from: 'Tom Hardin', 
    to: 'Tom Kirby', 
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    time: '3 hrs', 
    status: true, 
  },
  { 
    from: 'Tom Kirby', 
    to: 'Tom Hardin', 
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    time: '4 hrs', 
    status: false, 
  }
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
      <div className={classes.body}>
        {messages.map((message: any, index: number) => {
          return (
            <Message 
              key={index}
              data={message} 
              className={classes.message} 
            />
          )
        })}
      </div>
      <div className={classes.footer}>
        <div className={classes.messageBox}>
          <ClipIcon className={classes.icon} />
          <Typography variant="h6">
            @
            <span className={classes.primary}>tom kirby </span>
            here is a public facing message that is a couple lines long…
          </Typography>
        </div>
        <Alert />
      </div>
    </Paper>
  );
};