import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
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

export default function Alert() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <WarningIcon />
      <Typography variant="h6" style={{marginLeft: '12px'}}>
        This list and all of it’s contents will be public to the selected
        company upon creation.
      </Typography>
    </div>
  );
}
