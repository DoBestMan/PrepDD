import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Toolbar,
  Typography, 
  IconButton,
} from '@material-ui/core';
import PersonAdd from '@material-ui/icons/PersonAdd';
import AttachFile from '@material-ui/icons/AttachFile';
import GetApp from '@material-ui/icons/GetApp';
import Delete from '@material-ui/icons/DeleteForever';
import More from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      padding: '12px 24px', 
      borderBottom: '1px solid #D8D8D8',
    },
    grow: {
      flexGrow: 1, 
    },
    action: {
      color: theme.palette.text.secondary,      
    }
  })
);

export default function TaskToolbar() {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography variant="h4">
        List name / All sections
      </Typography>
      <div className={classes.grow} />
      <div className={classes.action}>
        <IconButton aria-label="filter list">
          <PersonAdd />
        </IconButton>
        <IconButton aria-label="filter list">
          <AttachFile />
        </IconButton>
        <IconButton aria-label="filter list">
          <GetApp />
        </IconButton>
        <IconButton aria-label="filter list">
          <Delete />
        </IconButton>
        <IconButton aria-label="filter list">
          <More />
        </IconButton>        
      </div>
    </Toolbar>
  )
}