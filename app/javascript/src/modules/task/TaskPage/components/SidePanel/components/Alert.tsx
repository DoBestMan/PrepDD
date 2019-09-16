import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Dialog, 
  DialogActions, 
  Button,
  Typography,
} from '@material-ui/core';
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
    mr12: {
      marginRight: '12px', 
    }
  })
);

interface AlertProps {
  onClick?: () => void;
}

export default function Alert( props: any) {
  const classes = useStyles();
	const { onClick } = props;

  return (
    <div className={classes.root}>
      <WarningIcon />
      <Typography variant="h6" style={{marginLeft: '12px'}}>
        This message and its content will be visible to the public
      </Typography>
      <Button variant="outlined" className={classes.mr12}>
        Cancel
      </Button>
      <Button onClick={onClick} variant="contained">
        Post
      </Button>
    </div>
  )
}
