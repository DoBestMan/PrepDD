import React, {useState} from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper, 
  Typography,
  List, 
  ListItem, 
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex', 
      alignItems: 'center', 
      padding: '3px 6px',
    },
    status: {
      width: '10px',
      height: '10px', 
      borderRadius: '50%', 
      marginRight: '6px', 
    }, 
    selected: {
      background: '#FFFFFF',
      border: '1px solid #ECECEC',
      borderRadius: '3px',
      width: 'fit-content', 
      cursor: 'pointer', 
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
  currentStatus: string;
  selected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

export default function StyledItem(props: StyledItemProps) {
  const {currentStatus, selected, onClick, className} = props;
  const classes = useStyles();

  const completedElement = <div className={clsx(classes.status, classes.completed)} />;
  const deliveredElement = <div className={clsx(classes.status, classes.delivered)} />;
  const finishedElement = <div className={clsx(classes.status, classes.finished)} />;
  const inProgressElement = <div className={clsx(classes.status, classes.progress)} />;
  const notStartedElement = <div className={clsx(classes.status, classes.notStarted)} />;
  const rejectedElement = <div className={clsx(classes.status, classes.rejected)} />;

  const statusOptions = [
    {value: 'Reject', label: 'Reject', element: rejectedElement},
    {value: 'Completed', label: 'Completed', element: completedElement},
    {value: 'Accept', label: 'Accept', element: null},
    {value: 'Deliver', label: 'Deliver', element: deliveredElement}, 
    {value: 'Finish', label: 'Finish', element: finishedElement}, 
    {value: 'Start', label: 'In Progress', element: inProgressElement}, 
    {value: 'Unstarted', label: 'Not Started', element: notStartedElement}, 
    {value: 'Rejected', label: 'Rejected', element: rejectedElement},
  ];

  const renderStatus = (status: string) => {
    const findOption = statusOptions.find(option => option.value === status);

    if (findOption) {
      return (
        <>
          {findOption.element}
          <Typography variant="h6">{findOption.label}</Typography>
        </>
      );
    }
    return (
      <Typography variant="h6">{currentStatus}</Typography>
    )
  }

  return (
    <div 
      className={clsx(classes.root, className, selected && classes.selected)}
      onClick={onClick}
    >
      {renderStatus(currentStatus)}
    </div>
  )
}