import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {ClickAwayListener, Paper} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      border: '1px solid #CACACA',
      borderRadius: '3px',
      minWidth: '150px',
    },
    smallHeight: {
      height: '31px',
    },
    grow: {
      flexGrow: 1,
    },
    paper: {
      width: '100%',
      position: 'absolute',
      top: 42,
      left: 0,
      zIndex: 2,
    },
    smallPaper: {
      top: 30,
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
    smallItem: {
      padding: '6px',
    },
  })
);

interface Option {
  id: string;
  name: string;
}

interface DropdownProps {
  options: Option[];
  selected: string;
  small?: boolean;
  placeholder?: string;
  handleUpdate?: (value: string) => void;
}

export default function Dropdown(props: DropdownProps) {
  const {options, selected, small, placeholder, handleUpdate} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);

  const renderLabel = () => {
    const res = options.find(option => option.id === selected);
    if (res) return res.name;
    return placeholder;
  };

  const toggleMenu = () => setOpen(prev => !prev);

  const handleClick = (value: string) => {
    setOpen(prev => !prev);
    if (handleUpdate) handleUpdate(value);
  };

  const handleClickAway = () => setOpen(false);

  return (
    <div className={clsx(classes.root, small && classes.smallHeight)}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <div
            className={clsx(classes.item, small && classes.smallItem)}
            onClick={toggleMenu}
          >
            {renderLabel()}
            <div className={classes.grow} />
            <i className="fa fa-caret-down" style={{marginLeft: '12px'}}></i>
          </div>
          <Paper
            className={clsx(
              classes.paper,
              !open && classes.invisible,
              small && classes.smallPaper
            )}
          >
            {options &&
              options.map(option => (
                <div
                  key={option.id}
                  className={classes.item}
                  onClick={() => handleClick(option.id)}
                >
                  {option.name}
                </div>
              ))}
          </Paper>
        </div>
      </ClickAwayListener>
    </div>
  );
}
