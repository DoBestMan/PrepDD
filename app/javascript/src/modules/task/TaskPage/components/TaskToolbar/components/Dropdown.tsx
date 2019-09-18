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
import CheckIcon from '@material-ui/icons/Done';

import * as cs from '../../../../../../constants/theme';
import {OptionType} from '../../../../../../constants/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: 'fit-content',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    outlined: {
      border: '1px solid #CACACA',
      borderRadius: '3px',
      padding: '6px 3px 6px 12px',
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
    item: {
      '&.Mui-selected .MuiTypography-body1': {
        color: '#FFFFFF',
      },
    },
    check: {
      color: cs.COLORS.primary,
    },
    grow: {
      flexGrow: 1,
    },
  })
);

interface DropdownProps {
  options: OptionType[];
  variant?: 'outlined';
  padding?: boolean;
  value: string[];
  placeholder?: string;
  multiSelection?: string;
  onChange?: (newValue: string) => void;
}

export default function Dropdown(props: DropdownProps) {
  const {
    options,
    variant,
    value,
    placeholder,
    multiSelection,
    onChange,
  } = props;
  const classes = useStyles({});
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  const renderLabel = () => {
    if (value.length > 1) {
      return multiSelection ? multiSelection : '';
    } else if (value.length === 1) {
      const selected = options.find(option => option.value === value[0]);

      if (selected) return selected.label;
    } else {
      return placeholder;
    }
  };

  return (
    <div
      className={clsx(classes.root, variant === 'outlined' && classes.outlined)}
    >
      <div className={classes.box} onClick={() => setOpen(!open)}>
        <Typography variant="h3">{renderLabel()}</Typography>
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
                  const isSelected =
                    value.findIndex(selected => selected === option.value) >= 0;

                  return (
                    <ListItem
                      key={option.value}
                      className={classes.item}
                      onClick={() => handleClick(option.value)}
                    >
                      <ListItemText primary={option.label} />
                      {isSelected && (
                        <>
                          <div className={classes.grow} />
                          <CheckIcon className={classes.check} />
                        </>
                      )}
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
