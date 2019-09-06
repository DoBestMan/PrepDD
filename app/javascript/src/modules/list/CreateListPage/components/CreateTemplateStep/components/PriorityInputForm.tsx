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
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';

import * as cs from '../../../../../../constants/theme';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex', 
      position: 'relative', 
      alignItems: 'center', 
      cursor: 'pointer', 
      '&:focus': {
        outline: 'none', 
      }
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
      backgroundColor: '#FFFFFF',
      border: '1px solid #2792A2',
    },
    low: {
      backgroundColor: '#FFFFFF',
      border: '1px solid #2792A2',
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
      '&:focus': {
        outline: 'none', 
      }
    },
  })
);

const options = [
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
]

interface PriorityInputFormProps {
  value: string;
  onChange: (newValue: string) => void;
}

export default function PriorityInputForm(props: PriorityInputFormProps) {
  const {value, onChange} = props;
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  
  const handleClick = () => {
    // Open dropdown menu
    setOpen(!open);
  }

  const handleSelect = (newValue: string) => {
    onChange(newValue);
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false); 
  }

  return (
    <div 
      className={classes.root} 
      tabIndex={0}
      onClick={handleClick} 
      onFocus={handleClick}
      onBlur={handleClose}
    >
      <div
        className={clsx(
          classes.status,
          value === 'high'
            ? classes.high
            : value === 'medium'
            ? classes.medium
            : classes.low
        )}
      />
      <Typography variant="h6" style={{textTransform: 'capitalize'}}>{value}</Typography>
      <ArrowDownIcon className={classes.arrowDown}/>
      {open ? (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper 
            className={classes.dropdown} 
            elevation={0}
            square
          >
            <List component="div" aria-labelledby="Priority Menu">
              {options.map(option => {
                return (
                  <ListItem 
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    autoFocus={option.value === value}
                  >
                    <div
                      className={clsx(
                        classes.status,
                        option.value === 'high'
                          ? classes.high
                          : value === 'medium'
                          ? classes.medium
                          : classes.low
                      )}
                    />
                    {option.label}
                  </ListItem>
                )
              })}
            </List>
          </Paper>
        </ClickAwayListener>
      ): null}
    </div>    
  )
}