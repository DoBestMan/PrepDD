import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Paper, Typography, TextField} from '@material-ui/core';
import ClipIcon from '@material-ui/icons/AttachFile';

import * as cs from '../../../../../../constants/theme';
import Message from '../../Message';
import Alert from './Alert';

import {UserTasks_userTasks as taskType} from '../../../../../../graphql/queries/__generated__/UserTasks';
import PublicTaskMessages from '../../../../../../graphql/queries/PublicTaskMessages';

import createPublicMessage from '../../../../../../graphql/mutations/CreatePublicTaskMessage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    invisible: {
      display: 'none',
    },
    body: {
      borderBottom: '1px solid #D8D8D8',
      height: 'calc(100vh - 254px)',
      padding: '12px', 
      overflow: 'auto', 
    },
    miniBody: {
      height: 'calc(100vh - 326px)',
    },
    footer: {
      padding: '6px 24px',
    },
    message: {
      backgroundColor: '#FFFFFF',
    },
    messageBox: {
      display: 'flex',
      alignItems: 'center', 
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
    },
  })
);

interface InternalPaneProps {
  value?: number;
  index?: number;
  //- TODO:  <14-09-19, mpf> -
  // we just need the task id
  taskId?: string;
}

export default function InternalPane(props: InternalPaneProps) {
  const {value, index, taskId} = props;
  const classes = useStyles();

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [messages, setMessages] = useState<any[]>([]);
  const data = PublicTaskMessages({taskId});

  // initialize new Message to empty string
  const [newMessage, setNewMessage] = useState<string>('');
  // upcates state
  const updateNewMessage = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewMessage(e.target.value);
  // [run mutation, response]
  const [createMessage, res] = createPublicMessage({
    message: newMessage,
    taskId: taskId as string,
  });

  const handleSendClick = () => {
    createMessage();
    setNewMessage('');
    setShowAlert(false);
  };

  const handleCancelClick = () => {
    setNewMessage('');
    setShowAlert(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowAlert(true);
  };

  // loads messages at query change
  useEffect(() => {
    const messages = idx(data, data => data.data.publicTaskMessages);
    if (messages) setMessages(messages);
  }, [data]);

  // updates DOM
  useEffect(() => {
    const newMessage = idx(res, res => res.data.createTaskMessages.message);

    if (newMessage) setMessages([...messages, newMessage]);
  }, [res]);

  return (
    <Paper
      className={clsx(classes.root, value !== index && classes.invisible)}
      aria-labelledby="Internal"
      elevation={0}
    >
      <div className={clsx(classes.body, showAlert && classes.miniBody)}>
        {messages.map((message: any, index: number) => {
          return (
            <Message key={index} data={message} className={classes.message} />
          );
        })}
      </div>
      <div className={classes.footer}>
        <div className={classes.messageBox}>
          <ClipIcon className={classes.icon} />
          <form onSubmit={handleSubmit} style={{width: '100%'}}>
            <TextField
              id="new-message-input"
              autoComplete="off"
              name="messageText"
              className={classes.input}
              placeholder="Message..."
              onChange={updateNewMessage}
              value={newMessage}
            />
          </form>
        </div>
        {showAlert && <Alert onClick={handleSendClick} onCancel={handleCancelClick}/>}
      </div>
    </Paper>
  );
}
