import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper,
	TextField
} from '@material-ui/core';

import Message from '../../Message';
import * as cs from '../../../../../../constants/theme';

import PrivateTaskMessages from '../../../../../../graphql/queries/PrivateTaskMessages';
import CreatePrivateTaskMessage from '../../../../../../graphql/mutations/CreatePrivateTaskMessage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '24px', 
    },
    body: {
      borderBottom: '1px solid #D8D8D8',
      height: 'calc(100vh - 364px)',
    },
    invisible: {
      display: 'none',
    },
    message: {
      backgroundColor: 'rgba(39, 146, 162, 0.1)',
    },
    footer: {
      padding: '16px 24px',
    },
    messageBox: {
      display: 'flex', 
      marginBottom: '12px',
    },
		input: {
      display: 'block',
      width: '100%',
      marginTop: '6px',
      color: '#606060',
      fontFamily: cs.FONT.family,
      fontWeight: cs.FONT.weight.regular,
      fontSize: cs.FONT.size.xs,
      textTransform: 'none',
      border: 'none',
      '& label': {
        color: '#606060',
        fontFamily: cs.FONT.family,
        fontWeight: cs.FONT.weight.regular,
        fontSize: cs.FONT.size.xs,
      },
      '&:selected': {
        color: '#3A84FF',
      },
      '& input::placeholder': {
        fontSize: '12px',
      },
      '& div': {
        width: '100%',
      },
      '& .MuiInput-underline:before, .MuiInput-underline:after, .MuiInput-underline:hover:not(.Mui-disabled):before': {
        border: 'none',
      },
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

	// initialize new Message to empty string
	const [newMessage, setNewMessage] = useState<string>('');
	// upcates state
	const updateNewMessage = (e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)
  // [run mutation, response]
  const [createMessage, res] = CreatePrivateTaskMessage({message: newMessage, taskId: taskId as string});

	const hashMessage = async () => {
		// make ajax call to service w/ text
		// return hash
    // await 
    // setNewMessage(hash)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		hashMessage();
		createMessage();
		setNewMessage('');
	}

	//- TODO:  <14-09-19, mpf: clean this up> -
	// clean this up.
	useEffect(() => {
		var messages = idx(data, data => data.data.privateTaskMessages)
		if (messages) setMessages(messages)
	}, [data])

	useEffect(() => {
		const newMessage = idx(res, res => res.data.createTaskMessages.message);

		if (newMessage) setMessages([...messages, newMessage])
	}, [res] )

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
			<form onSubmit={handleSubmit}>
			<TextField 
				id='new-message-input'
				autoComplete='off'
				name='messageText'
				className={classes.input}
				placeholder='Message...'
				onChange={updateNewMessage}
				value={newMessage}
			/>
			</form>
			</div>
			</div>
    </Paper>
  );
}
