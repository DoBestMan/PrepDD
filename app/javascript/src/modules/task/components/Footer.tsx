import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '72px',
    },
  })
);

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Button style={{marginTop: '18px'}}>
          + Add Task
        </Button>
      </Container>
    </div>
  );
}
