import React, {useState} from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  ClickAwayListener,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';

import {OptionType} from '../../constants/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: 'fit-content',
    },
    outlined: {
      border: '1px solid #CACACA',
      borderRadius: '3px',
      padding: '6px 3px 6px 12px', 
      '&:hover': {
        cursor: 'pointer',
        background: '#EBF2FF',
      },
    },
    box: {
      display: 'flex',
      alignItems: 'center',
      height: '100%', 
    },
    paper: {
      position: 'absolute',
      top: '30px',
      left: '-9px',
      border: '1px solid #D8D8D8',
      width: 'max-content', 
      minWidth: '100%',
      zIndex: 2, 
    },
  })
);

interface DropdownProps {
  options: OptionType[];
  variant?: 'outlined';
  padding?: boolean;
  value: string;
  placeholder?: string;
  onChange?: (newValue: string) => void;
}

export default function Dropdown(props: DropdownProps) {
  const {
    options, 
    variant,
    value, 
    placeholder, 
    onChange
  } = props;
  const classes = useStyles({});
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = (newValue: string) => {
    setOpen(!open);
    if (onChange) {
      onChange(newValue);
    }
  };

  const renderLabel = () => {
    const selected = options.find(option => option.value === value);

    if (selected) return selected.label;
    return placeholder;
  };

  return (
    <div className={clsx(classes.root, variant === 'outlined' && classes.outlined)}>
      <div className={classes.box} onClick={() => setOpen(!open)}>
        <Typography variant="h4">{renderLabel()}</Typography>
        <ArrowDownIcon style={{marginLeft: '6px'}} />
      </div>

      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper 
            className={classes.paper} 
            elevation={variant === 'outlined' ? 1 : 0} 
            square={variant !== 'outlined'}
          >
            <List>
              {options &&
                options.map((option: OptionType) => {
                  return (
                    <ListItem
                      key={option.value}
                      onClick={() => handleClick(option.value)}
                    >
                      <ListItemText primary={option.label} />
                    </ListItem>
                  );
                })}
              {(!options || !options.length) && (
                <ListItem>
                  <ListItemText primary="No available data" />
                </ListItem>
              )}
            </List>
          </Paper>
        </ClickAwayListener>
      )}
    </div>
  );
}
