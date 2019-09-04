import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '72px', 
      padding: '0px calc((100% - 1380px) / 2) 0px calc((100% - 1380px) / 2)', 
    },
  })
);

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button style={{marginTop: '18px'}}>
        + Add Task
      </Button>
    </div>
  );
}
