import React, {useState} from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  ClickAwayListener, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
} from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Create';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';

import * as cs from '../../../../../../constants/theme';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex', 
      position: 'relative', 
      alignItems: 'center', 
      cursor: 'pointer', 
    },
    status: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      marginRight: '6px',
    },
    high: {
      backgroundColor: '#2792A2',
    },
    medium: {
      backgroundColor: '#1969A5',
    },
    low: {
      backgroundColor: '#81AFFF',
    },
    update: {
      marginLeft: '12px', 
      color: cs.COLORS.primary, 
      fontSize: '15px', 
      cursor: 'pointer', 
      visibility: 'hidden'
    },
    visible: {
      visibility: 'visible', 
    },
    arrowDown: {
      marginLeft: '6px', 
      fontSize: '15px', 
      cursor: 'pointer',       
    },
    dropdown: {
      position: 'absolute',
      top: '34px',
      left: '0px',
      width: '100px',
      zIndex: 1, 
      border: '1px solid #D8D8D8',
    },
  })
);

interface PriorityFormProps {
  value: string;
}

export default function PriorityForm(props: PriorityFormProps) {
  const {value} = props;
  const classes = useStyles();
  const [editable, setEditable] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  
  const handleClick = () => {
    if (!editable) return;
    // Open dropdown menu
    setOpen(!open);
  }

  const handleSelect = () => {
    setOpen(false);
    setEditable(false);
    setHover(false);
  }

  const handleClose = () => {
    setOpen(false);
    setEditable(false);
    setHover(false);    
  }

  return (
    <div 
      className={classes.root}
      onMouseOver={() => setHover(true)}
      onMouseLeave={handleClose}
      onClick={handleClick}
    >
      <div
        className={clsx(
          classes.status,
          value === 'High'
            ? classes.high
            : value === 'Medium'
            ? classes.medium
            : classes.low
        )}
      />
      <Typography variant="h6">{value}</Typography>
      {editable ? (
        <ArrowDownIcon className={classes.arrowDown} />
      ) : (
        <UpdateIcon 
          className={clsx(classes.update, hover && classes.visible)} 
          onClick={() => setEditable(true)}
        />
      )}
      {open ? (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper className={classes.dropdown} elevation={0} square>
            <List component="div" aria-labelledby="Priority Menu">
              <ListItem onClick={handleSelect}>High</ListItem>
              <ListItem onClick={handleSelect}>Medium</ListItem>
              <ListItem onClick={handleSelect}>Low</ListItem>
            </List>
          </Paper>
        </ClickAwayListener>
      ): null}
    </div>
  )
}