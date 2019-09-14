import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper,
} from '@material-ui/core';

import Message from '../../Message';

import PrivateTaskMessages from '../../../../../../graphql/queries/PrivateTaskMessages';

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
    }
  })
);

interface InternalPaneProps {
  value?: number;
  index?: number;
  taskId?: string;
}

export default function InternalPane(props: InternalPaneProps) {
  const {value, index, taskId} = props;
  const classes = useStyles();

	const [messages, setMessages] = useState<any[]>([]);
	const data = PrivateTaskMessages({taskId})

	//- TODO:  <14-09-19, mpf: clean this up> -
	// clean this up.
	useEffect(() => {
		var messages = idx(data, data => data.data.privateTaskMessages)
		if (messages) setMessages(messages)
	}, [data])

  return (
    <Paper
      className={clsx(classes.root, value !== index && classes.invisible)}
      aria-labelledby="Internal"
      elevation={0}
    >
      {messages.map((message: any, index: number) => {
        return (
          <Message 
            key={index}
            data={message} 
            className={classes.message} 
          />
        )
      })}
    </Paper>
  );
}
