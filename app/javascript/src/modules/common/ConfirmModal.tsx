import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/WarningRounded';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      backgroundColor: 'rgba(248,231,28,0.20)',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
      marginTop: '12px',
      padding: '12px 20px',
    },
  })
);

interface ConfirmModalProps {
	confirmMessage: string;
	confirmAction: any;
	denyAction: any;
}

export default function ConfirmModal(props: ConfirmModalProps) {
  const classes = useStyles();
	const { 
		confirmMessage,
		confirmAction,
		denyAction
  } = props;

  return (
    <div className={classes.root}>
      <WarningIcon />
      <Typography variant="h6" style={{marginLeft: '12px'}}>
        {confirmMessage} 
      </Typography>
      <Button onClick={denyAction} variant="outlined" className={''}>
        Cancel
      </Button>
      <Button onClick={confirmAction} variant="contained">
        Yes
      </Button>
    </div>
  )
};
