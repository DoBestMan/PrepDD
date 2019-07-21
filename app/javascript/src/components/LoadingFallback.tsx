import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
});

export default function LoadingFallback() {
  const classes = useStyles({});
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.box}>
        <CircularProgress />
      </div>
    </Container>
  );
}
