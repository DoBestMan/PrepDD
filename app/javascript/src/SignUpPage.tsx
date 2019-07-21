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
import {GoogleLogin} from 'react-google-login';
import {gql} from 'apollo-boost';
import {Link as RouterLink, navigate} from '@reach/router';
import {LinkedIn} from 'react-linkedin-login-oauth2';
import {makeStyles} from '@material-ui/core/styles';
import {useMutation} from 'react-apollo';
import {useRequireGuest} from './hooks/auth';

const SIGN_UP_USER = gql`
  mutation SignUpPage_SignUpUser(
    $fullName: String!
    $email: String!
    $password: String!
    $companyName: String!
  ) {
    signUpUser(
      fullName: $fullName
      email: $email
      password: $password
      companyName: $companyName
    ) {
      user {
        email
      }
      errors {
        path
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
    border: 2,
    boxShadow:
      'rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px',
  },
}));

export default function SignUpPage(props: {path?: string}) {
  useRequireGuest();

  const classes = useStyles({});

  const [state, setState] = useState<{
    fullName: string;
    email: string;
    password: string;
    companyName: string;
    socialLogin: boolean;
  }>({
    fullName: '',
    email: '',
    password: '',
    companyName: '',
    socialLogin: false,
  });

  const [signUpUser, {loading, data}] = useMutation(SIGN_UP_USER, {
    variables: {
      fullName: state.fullName,
      email: state.email,
      password: state.password,
      companyName: state.companyName,
    },
  });

  useEffect(() => {
    if (idx(data, x => x.signUpUser.success)) {
      navigate('/dashboard');
    }
  }, [data]);

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

  const responseGoogle = (response: any) => {
    console.log(response);
  };

  const successGoogle = (response: any) => {
    console.log(response);
    if (response.profileObj) {
      console.log('was here');
      setState(state => ({...state, email: response.profileObj.email}));
      setState(state => ({...state, fullName: response.profileObj.name}));
      setState(state => ({...state, socialLogin: true}));
    }
  };

  const failGoogle = (response: any) => {
    console.log(response);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          {errorFor('root') && (
            <FlashMessage
              className={classes.flash}
              variant="warning"
              message={errorFor('root')}
            />
          )}

          {state.socialLogin && (
            <FlashMessage
              className={classes.flash}
              variant="info"
              message={'Add company name'}
            />
          )}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Full Name"
            name="fullName"
            autoFocus
            value={state.fullName}
            error={!!errorFor('fullName')}
            helperText={errorFor('fullName')}
            onChange={onChangeInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Company Name"
            name="companyName"
            error={!!errorFor('companyName')}
            helperText={errorFor('companyName')}
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
            value={state.email}
            error={!!errorFor('email')}
            helperText={errorFor('email')}
            onChange={onChangeInput}
          />
          {!state.socialLogin && (
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
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>

        {!state.socialLogin && (
          <Grid container>
            <Grid item xs>
              <GoogleLogin
                clientId="1090849701177-kq5gufe0g2vssa71lu9jkg1tid11k6ib.apps.googleusercontent.com"
                buttonText="Sign Up Gmail"
                onSuccess={successGoogle}
                onFailure={failGoogle}
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
                Sign Up LinkedIn
              </LinkedIn>
            </Grid>
          </Grid>
        )}

        <Grid container justify="center">
          <Grid item>
            <Link component={RouterLink} variant="body2" to="/signin">
              {'Already have an account? Sign In'}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
