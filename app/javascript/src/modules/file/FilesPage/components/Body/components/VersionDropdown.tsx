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

import * as cs from '../../../../../../constants/theme';

const Excel = require('images/dummy/logos/excel.svg');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      cursor: 'pointer',
      width: 'fit-content',
    },
    primary: {
      color: cs.COLORS.primary,
    },
    hover: {
      position: 'absolute',
      top: '-12px',
      left: '-6px',
      padding: '3px 6px',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
      backgroundColor: cs.COLORS.primaryHover,
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
    },
    paper: {
      width: '200px',
      position: 'absolute',
      border: '1px solid #D8D8D8',
      top: '17px',
      left: '-6px',
      zIndex: 2,
    },
    invisible: {
      display: 'none',
    },
    mr12: {
      marginRight: '12px',
    },
  })
);

interface DropdownProps {
  value: string;
  placeholder?: string;
  handleUpdate?: (value: string) => void;
}

export default function VersionDropdown(props: DropdownProps) {
  const {value, handleUpdate} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleMenu = () => setOpen(prev => !prev);

  const handleClick = (value: string) => {
    setOpen(prev => !prev);
    if (handleUpdate) handleUpdate(value);
  };

  return (
    <div
      className={classes.root}
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className={clsx(open && classes.hover)}
        onMouseOver={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Typography
          variant="h6"
          className={clsx(classes.primary, classes.flex)}
        >
          Update
          {open && (
            <i className="fa fa-caret-down" style={{marginLeft: '12px'}}></i>
          )}
        </Typography>
      </div>
      <Paper
        className={clsx(classes.paper, !open && classes.invisible)}
        elevation={0}
        square
      >
        <List>
          <ListItem>
            <div className={classes.flex}>
              <img
                src={Excel}
                width="18"
                height="18"
                className={classes.mr12}
              />
              <Typography variant="h6">File name</Typography>
            </div>
          </ListItem>
          <ListItem>
            <div className={classes.flex}>
              <img
                src={Excel}
                width="18"
                height="18"
                className={classes.mr12}
              />
              <Typography variant="h6">File name</Typography>
            </div>
          </ListItem>
          <ListItem>
            <div className={classes.flex}>
              <img
                src={Excel}
                width="18"
                height="18"
                className={classes.mr12}
              />
              <Typography variant="h6">File name</Typography>
            </div>
          </ListItem>
        </List>
      </Paper>
    </div>
  );
}
