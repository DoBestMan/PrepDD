import React, {useCallback, useState} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {navigate} from '@reach/router';
import {makeStyles} from '@material-ui/core/styles';
import {useRequireGuest} from '../../hooks/auth';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  flash: {
    marginBottom: theme.spacing(1),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateCompanyPage(_props: {path?: string}) {
  useRequireGuest();

  const classes = useStyles({});

  const [state, setState] = useState<{
    companyName: string;
  }>({
    companyName: '',
  });

  const onSubmit = useCallback(
    e => {
      console.log('called...');
      e.preventDefault();
      navigate('/signup');
    },
    [],
  );

  const onChangeInput = useCallback(
    e => {
      const {name, value} = e.target;
      setState(state => ({...state, [name]: value}));
      localStorage.setItem('CompanyName', value);
    },
    [setState]
  );

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          New Company
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Company Name"
            name="companyName"
            onChange={onChangeInput}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Continue
          </Button>
        </form>
      </div>
    </Container>
  );
}
