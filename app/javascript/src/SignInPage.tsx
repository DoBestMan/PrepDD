import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import React, {useCallback, useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {gql} from 'apollo-boost';
import {makeStyles} from '@material-ui/core/styles';
import {useMutation} from 'react-apollo';
import FlashMessage from './ui/FlashMessage';
import {Link as RouterLink} from '@reach/router';

const SIGN_IN_USER = gql`
  mutation($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) {
      user {
        email
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

export default function SignInPage(props: {path?: string}) {
  const classes = useStyles({});

  const [state, setState] = useState<{
    email: string;
    password: string;
    remember: boolean;
  }>({
    email: '',
    password: '',
    remember: false,
  });

  const [signInUser, {loading, error, data}] = useMutation(SIGN_IN_USER, {
    variables: {
      email: state.email,
      password: state.password,
    },
  });

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      signInUser();
    },
    [signInUser]
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          {error &&
            error.graphQLErrors.map((error, index) => (
              <FlashMessage
                key={index}
                className={classes.flash}
                variant="error"
                message={error.message}
              />
            ))}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
            id="password"
            autoComplete="current-password"
            onChange={onChangeInput}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                name="remember"
                color="primary"
                onChange={onChangeInput}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} variant="body2" to="/">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
