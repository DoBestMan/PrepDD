import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '72px',
    },
    addButton: {
      marginTop: '24px',
      padding: '0px',
      color: '#3A84FF',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      textTransform: 'capitalize',
      '&:hover, &:focus': {
        background: 'none',
      },
    },
  })
);

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Button style={{width: '90px'}}>
          + Add Task
        </Button>
      </Container>
    </div>
  );
}
