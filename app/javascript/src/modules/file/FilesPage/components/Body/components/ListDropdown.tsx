import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  ClickAwayListener,
  Paper,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';

import {OptionType} from '../../../../../../constants/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '450px',
      marginRight: '30px',
    },
    grow: {
      flexGrow: 1,
    },
    paper: {
      width: '100%',
      position: 'absolute',
      border: '1px solid #D8D8D8',
      top: 42,
      left: 0,
      zIndex: 2,
    },
    invisible: {
      display: 'none',
    },
    item: {
      display: 'flex',
      padding: '12px',
      alignItems: 'center',
      boxSizing: 'border-box',
      color: '#606060',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      textTransform: 'capitalize',
      '&:hover': {
        cursor: 'pointer',
        background: '#EBF2FF',
      },
    },
    textFlow: {
      display: 'inline-block',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  })
);

interface DropdownProps {
  options: OptionType[];
  value: string;
  placeholder?: string;
  handleUpdate?: (value: string) => void;
}

export default function TitleDropdown(props: DropdownProps) {
  const {options, value, placeholder, handleUpdate} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);

  const renderLabel = () => {
    const res = options.find(option => option.value === value);
    if (res) return res.label;
    return placeholder;
  };

  const toggleMenu = () => setOpen(prev => !prev);

  const handleClick = (value: string) => {
    setOpen(prev => !prev);
    if (handleUpdate) handleUpdate(value);
  };

  const handleClickAway = () => setOpen(false);

  return (
    <div className={classes.root}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <div className={classes.item} onClick={toggleMenu}>
            <Typography variant="h6" className={classes.textFlow}>
              {renderLabel()}
            </Typography>
            <div className={classes.grow} />
            <i className="fa fa-caret-down" style={{marginLeft: '12px'}}></i>
          </div>
          <Paper
            className={clsx(classes.paper, !open && classes.invisible)}
            elevation={0}
            square
          >
            <List>
              {options &&
                options.map(option => (
                  <ListItem
                    key={option.value}
                    onClick={() => handleClick(option.value)}
                  >
                    <Typography variant="h6" className={classes.textFlow}>
                      {option.label}
                    </Typography>
                  </ListItem>
                ))}
            </List>
          </Paper>
        </div>
      </ClickAwayListener>
    </div>
  );
}
