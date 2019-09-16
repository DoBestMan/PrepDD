import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Paper, List, ListItem, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      cursor: 'pointer',
      width: '100px',
    },
    hover: {
      position: 'absolute',
      top: '-12px',
      left: '-6px',
      padding: '3px 6px',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
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

export default function TitleDropdown(props: DropdownProps) {
  const {value, handleUpdate} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);

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
        <Typography variant="h6" className={classes.flex}>
          {value}
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
            <Typography variant="h6">List Title</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="h6">List Title</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="h6">List Title</Typography>
          </ListItem>
        </List>
      </Paper>
    </div>
  );
}
