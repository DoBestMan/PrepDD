import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import idx  from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper,
  Typography, 
  TextField
} from '@material-ui/core';
import ClipIcon from '@material-ui/icons/AttachFile';

import * as cs from '../../../../../../constants/theme';
import Message from '../../Message';
import Alert from './Alert';

import {
  UserTasks_userTasks as taskType
} from '../../../../../../graphql/queries/__generated__/UserTasks';
import { taskMessages_task_messages as taskMessagesType } from '../../../../../../graphql/queries/__generated__/taskMessages';
import taskMessages from '../../../../../../graphql/queries/TaskMessages';

import createPublicMessage from '../../../../../../graphql/mutations/CreatePublicTaskMessage';


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
    },
// TODO:  <14-09-19, mpf> -
// cribbing the input format directly from elsewhere -- might need to tweak this
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
  //- TODO:  <14-09-19, mpf> -
	// we just need the task id 
	task?:  taskType;
}

export default function InternalPane(props: InternalPaneProps) {
  const {value, index, task} = props;
  const classes = useStyles();

	const [messages, setMessages] = useState<any[]>([]);
	const {loading, data, error} = taskMessages({id: 16});

	const [newMessage, setNewMessage] = useState<string>('');
  const [createMessage, res] = createPublicMessage({message: newMessage, taskId: '16'});
	const updateNewMessage = (e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)

	const handleSendClick = () => {
		createMessage();
		setNewMessage('');
	}

  // loads messages at query change
	useEffect(() => {
		const messages = idx(data, data => data.task.messages);

		if (loading) return;
		if (messages) setMessages(messages);
	}, [loading])

	// updates DOM
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
			<ClipIcon className={classes.icon} />
			<TextField 
				id='new-message-input'
				name='messageText'
				className={classes.input}
				placeholder='Message...'
				onChange={updateNewMessage}
				value={newMessage}
			/>
			</div>
			<Alert onClick={handleSendClick}/>
			</div>
			</Paper>
			);
};
