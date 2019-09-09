import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex', 
      alignItems: 'center', 
    },
    status: {
      width: '10px',
      height: '10px', 
      borderRadius: '50%', 
      marginRight: '6px', 
    }, 
    selected: {
      padding: '3px 6px',
      background: '#FFFFFF',
      border: '1px solid #ECECEC',
      borderRadius: '3px',
      width: 'fit-content', 
    },
    completed: {
      backgroundColor: '#509E6D'
    }, 
    delivered: {
      backgroundColor: '#3A84FF',
    },
    finished: {
      backgroundColor: '#0E3B5C', 
    }, 
    progress: {
      backgroundColor: 'rgba(80,158,109,0.50)',
    }, 
    notStarted: {
      backgroundColor: '#6EB81D',
    }, 
    rejected: {
      backgroundColor: '#FF507C',
    },
  })
);

interface StyledItemProps {
  status: string;
  selected?: boolean;
}

export default function StyledItem(props: StyledItemProps) {
  const {status, selected} = props;
  const classes = useStyles();

  const renderStatus = () => {
    switch (status) {
      case 'Completed':
        return (
          <div className={clsx(classes.status, classes.completed)} />
        );
      case 'Delivered':
        return (
          <div className={clsx(classes.status, classes.delivered)} />
        );
      case 'Finished':
        return (
          <div className={clsx(classes.status, classes.finished)} />
        );
      case 'In Progress':
        return (
          <div className={clsx(classes.status, classes.progress)} />
        );
      case 'Not Started':
        return (
          <div className={clsx(classes.status, classes.notStarted)} />
        );
      case 'Rejected':
        return (
          <div className={clsx(classes.status, classes.rejected)} />
        );
    }
  }

  return (
    <div className={clsx(classes.root, selected && classes.selected)}>
      {renderStatus()}
      <Typography variant="h6">{status}</Typography>
    </div>
  )
}