import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Dialog, DialogActions, Button, Typography} from '@material-ui/core';
import WarningIcon from '@material-ui/icons/WarningRounded';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      backgroundColor: 'rgba(58, 132, 255, 0.1)',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
    },
  })
);

interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AlertDialog(props: DialogProps) {
  const {open, setOpen} = props;
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className={classes.root}>
        <WarningIcon />
        <Typography variant="h6" style={{marginLeft: '12px'}}>
          You will be logged out of the application in the next minute due to
          inactivity. Please Reauthenticate if you wish to remain logged in.
        </Typography>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="contained">
            Reauthenticate
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
