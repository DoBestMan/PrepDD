import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FlashMessage from './ui/FlashMessage';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import idx from 'idx';
import Link from '@material-ui/core/Link';
import React, {useCallback, useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {gql} from 'apollo-boost';
import {Link as RouterLink, navigate} from '@reach/router';
import {makeStyles} from '@material-ui/core/styles';
import {useMutation} from 'react-apollo';

import {GoogleLogin} from 'react-google-login';
import {LinkedIn} from 'react-linkedin-login-oauth2';

const SIGN_IN_USER = gql`
  mutation($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) {
      user {
        email
      }
      errors {
        message
      }
      success
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
  socialGmail: {
    width: 170,
    textAlign: 'center',
    marginBottom: 10,
    height: 43,
  },
  socialLinkedIn: {
    width: 170,
    textAlign: 'center',
    marginBottom: 10,
    background: '#007bb6',
    color: 'white',
    height: 43,
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

  const [signInUser, {loading, data}] = useMutation(SIGN_IN_USER, {
    variables: {
      email: state.email,
      password: state.password,
    },
  });
  const errors: ({message: string})[] | null = idx(
    data,
    x => x.signInUser.errors
  );

  useEffect(() => {
    if (idx(data, x => x.signInUser.success)) {
      navigate('/dashboard');
    }
  }, [data]);

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

  const responseGoogle = response => {
    console.log(response);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          {errors &&
            errors.map((error, index) => (
              <FlashMessage
                key={index}
                className={classes.flash}
                variant="warning"
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
        </form>

        <Grid container>
          <Grid item xs>
            <GoogleLogin
              clientId="1090849701177-kq5gufe0g2vssa71lu9jkg1tid11k6ib.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              className={classes.socialGmail}
            />
          </Grid>

          <Grid item>
            <LinkedIn
              clientId="81lx5we2omq9xh"
              onFailure={responseGoogle}
              onSuccess={responseGoogle}
              redirectUri="http://localhost:3000/linkedin"
              className={classes.socialLinkedIn}
            >
              Login LinkedIn
            </LinkedIn>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs>
            <Link component={RouterLink} variant="body2" to="/forgot">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} variant="body2" to="/">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
