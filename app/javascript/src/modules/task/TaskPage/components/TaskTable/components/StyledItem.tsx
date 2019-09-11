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
      position: 'relative', 
    },
    flex: {
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
    paper: {
      position: 'absolute', 
      top: '30px', 
      left: '0px', 
      backgroundColor: '#FFFFFF', 
      zIndex: 1, 
      width: 'max-content', 
      minWidht: '100%',
      border: '1px solid #D8D8D8', 
    },
    item: {
      marginTop: '3px', 
      marginBottom: '3px', 
      paddingLeft: '12px', 
      paddingRight: '12px', 
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
  onChange?: (newStatus: string) => void;
}

export default function StyledItem(props: StyledItemProps) {
  const {currentStatus, selected} = props;
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const completedElement = <div className={clsx(classes.status, classes.completed)} />;
  const deliveredElement = <div className={clsx(classes.status, classes.delivered)} />;
  const finishedElement = <div className={clsx(classes.status, classes.finished)} />;
  const inProgressElement = <div className={clsx(classes.status, classes.progress)} />;
  const notStartedElement = <div className={clsx(classes.status, classes.notStarted)} />;
  const rejectedElement = <div className={clsx(classes.status, classes.rejected)} />;

  const statusOptions = [
    {value: 'Completed', element: completedElement},
    {value: 'Delivered', element: deliveredElement}, 
    {value: 'Finished', element: finishedElement}, 
    {value: 'In Progress', element: inProgressElement}, 
    {value: 'Unstarted', element: notStartedElement}, 
    {value: 'Reject', element: rejectedElement},
  ];

  const renderStatus = (status: string) => {
    const findOption = statusOptions.find(option => option.value === status);

    if (findOption) {
      return findOption.element;
    }
    return null;
  }

  return (
    <div className={classes.root} onClick={() => setOpen(!open)}>
      <div className={clsx(classes.flex, selected && classes.selected)}>
        {renderStatus(currentStatus)}
        <Typography variant="h6">{currentStatus}</Typography>
      </div>
      {open ? (
        <Paper
          className={classes.paper}
          elevation={0}
          square
        >
          <List>
            {statusOptions.map(option => {
              return (
                <ListItem key={option.value} className={clsx(classes.flex, classes.item)}>
                  {renderStatus(option.value)}
                  <Typography variant="h6">{option.value}</Typography>
                </ListItem>            
              )
            })}
          </List>
        </Paper>
      ) : null}
    </div>
  )
}