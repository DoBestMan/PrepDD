import React, {useState, useEffect, SyntheticEvent} from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

import Header from './components/Header';
import Body from './components/Body';
import FlashMessage from '../common/FlashMessage';

import {NotificationType} from '../../constants/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

export default function CreateTaskPage() {
  const classes = useStyles();
  const [messageOpen, setMessageOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  useEffect(() => {
    if (notification) {
      setMessageOpen(true);
    }
  }, [notification]);

  const handleCloseMessage = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessageOpen(false);
  };

  return (
    <div className={classes.root}>
      {notification && (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={messageOpen}
          autoHideDuration={3000}
          onClose={handleCloseMessage}
        >
          <FlashMessage
            variant={notification.variant}
            message={notification.message}
            onClose={handleCloseMessage}
          />
        </Snackbar>
      )}
      <Header />
      <Body setNotification={setNotification} />
    </div>
  );
}
