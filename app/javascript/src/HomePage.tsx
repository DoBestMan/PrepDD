import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import idx from 'idx';
import Link from '@material-ui/core/Link';
import React, {useCallback, useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {gql} from 'apollo-boost';
import {Link as RouterLink} from '@reach/router';
import {makeStyles} from '@material-ui/core/styles';
import {useMutation} from 'react-apollo';

const SIGN_UP_USER = gql`
  mutation($fullName: String!, $email: String!, $password: String!) {
    signUpUser(fullName: $fullName, email: $email, password: $password) {
      user {
        email
      }
      errors {
        path
        message
      }
    }
  }
`;

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

export default function HomePage(props: {path?: string}) {
  const classes = useStyles({});

  const [state, setState] = useState<{
    fullName: string;
    email: string;
    password: string;
  }>({
    fullName: '',
    email: '',
    password: '',
  });

  const [signUpUser, {loading, data}] = useMutation(SIGN_UP_USER, {
    variables: {
      fullName: state.fullName,
      email: state.email,
      password: state.password,
    },
  });

  function errorFor(path: string) {
    const errors = idx(data, x => x.signUpUser.errors);
    if (!errors) {
      return;
    }
    const error = errors.find((e: {path: string}) => e.path === path);
    if (!error) {
      return;
    }
    return error.message;
  }

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      signUpUser();
    },
    [signUpUser]
  );

  const onChangeInput = useCallback(
    e => {
      const {name, value} = e.target;
      setState(state => ({...state, [name]: value}));
    },
    [setState]
  );

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Full Name"
            name="fullName"
            autoFocus
            error={!!errorFor('fullName')}
            helperText={errorFor('fullName')}
            onChange={onChangeInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            error={!!errorFor('email')}
            helperText={errorFor('email')}
            onChange={onChangeInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            error={!!errorFor('password')}
            helperText={errorFor('password')}
            onChange={onChangeInput}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link component={RouterLink} variant="body2" to="/signin">
                {'Already have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
