import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FlashMessage from '../common/FlashMessage';
import Grid from '@material-ui/core/Grid';
import idx from 'idx';
import Link from '@material-ui/core/Link';
import React, {useCallback, useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import {Link as RouterLink} from 'react-router-dom';
import {LinkedIn} from 'react-linkedin-login-oauth2';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {useGlobalState} from '../../store';
import {useSignUpUser} from '../../graphql/mutations/SignUpUser';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      width: '86%',
      marginLeft: '7%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    socialGmail: {
      fontSize: '12px',
      width: '90%',
      textAlign: 'center',
      marginBottom: 10,
      height: 43,
      borderRadius: 5,
    },
    socialLinkedIn: {
      fontSize: '12px',
      width: '90%',
      marginLeft: '10%',
      marginBottom: 10,
      background: '#007bb6',
      color: 'white',
      height: 43,
      border: 2,
      borderRadius: 5,
      boxShadow:
        'rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px',
    },
    passwordValid: {
      marginTop: 50,
    },
    greenCheck: {
      color: 'green',
    },
    linkedInText: {
      marginRight: 10,
      display: 'inline',
      fontWeight: 'bold',
    },
    socialButtons: {
      width: '86%',
      marginLeft: '7%',
    },
    signUpTitle: {
      textAlign: 'center',
    },
  })
);

const SignUpPage = (props: any) => {
  // useRequireGuest();
  const {match, history} = props;
  const {dispatch} = useGlobalState();
  const classes = useStyles({});

  const [state, setState] = useState<{
    fullName: string;
    email: string;
    password: string;
    companyName: string;
    socialLogin: boolean;
    tokenID: string;
    provider: string;
    uuID: string;
    hasUpperCase: boolean;
    hasSpecialChar: boolean;
    hasEightChar: boolean;
  }>({
    fullName: '',
    email: '',
    password: '',
    companyName: '',
    socialLogin: false,
    tokenID: '',
    provider: '',
    uuID: '',
    hasUpperCase: false,
    hasSpecialChar: false,
    hasEightChar: false,
  });

  const [signUpUser, {loading, data}] = useSignUpUser({
    fullName: state.fullName,
    email: state.email,
    password: state.password,
    companyName: state.companyName,
    socialLogin: state.socialLogin,
    tokenID: state.tokenID,
    provider: state.provider,
    uuID: state.uuID,
  });

  interface linkedInResponse {
    code: string;
  }

  useEffect(() => {
    const signedUpUser = idx(data, data => data.signUpUser.user);
    if (loading || !signedUpUser) return;

    dispatch({
      type: 'SET_CURRENT_USER', 
      user: signedUpUser
    });
    history.push('/app/');
  }, [loading, data]);

  useEffect(() => {
    const companyName = match.params.companyName;
    if (companyName !== null) {
      setState(state => ({...state, companyName: companyName}));
    }
  }, []);

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
      if (name == 'password') {
        if (value.match(/[A-Z]/)) {
          setState(state => ({...state, hasUpperCase: true}));
        } else {
          setState(state => ({...state, hasUpperCase: false}));
        }

        if (value.length >= 8) {
          setState(state => ({...state, hasEightChar: true}));
        } else {
          setState(state => ({...state, hasEightChar: false}));
        }

        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)) {
          setState(state => ({...state, hasSpecialChar: true}));
        } else {
          setState(state => ({...state, hasSpecialChar: false}));
        }
      }
    },
    [setState]
  );

  const responseGoogle = (response: string) => {
    console.log(response);
  };

  function isGoogleLoginResponse(arg: any): arg is GoogleLoginResponse {
    return arg.getBasicProfile !== undefined;
  }

  const successGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if (isGoogleLoginResponse(response)) {
      setState(state => ({
        ...state,
        email: response.getBasicProfile().getEmail(),
        fullName: response.getBasicProfile().getName(),
        socialLogin: true,
        provider: 'gmail',
        tokenID: response.getAuthResponse().id_token,
        uuID: response.getBasicProfile().getId(),
      }));
      signUpUser();
    }
  };

  const failGoogle = (response: string) => {
    console.log(response);
  };

  const successLinkedIn = (data: linkedInResponse) => {
    setState(state => ({
      ...state,
      socialLogin: true,
      provider: 'linkedIn',
      tokenID: data.code,
    }));
    signUpUser();
  };

  return (
    <Container component="main" maxWidth="xl">
      <div className={classes.paper}>
        <Grid container spacing={5}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <div className={classes.signUpTitle}>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
            </div>
            <form className={classes.form} noValidate onSubmit={onSubmit}>
              {errorFor('root') && (
                <FlashMessage
                  className={classes.flash}
                  variant="warning"
                  message={errorFor('root')}
                />
              )}

              {errorFor('uuid') && (
                <FlashMessage
                  className={classes.flash}
                  variant="warning"
                  message={errorFor('uuid')}
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
                label="Email Address"
                name="email"
                autoComplete="email"
                value={state.email}
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
            </form>

            <Grid className={classes.socialButtons} container>
              <Grid item xs={6} lg={6} md={6}>
                <GoogleLogin
                  clientId="1090849701177-kq5gufe0g2vssa71lu9jkg1tid11k6ib.apps.googleusercontent.com"
                  buttonText="Sign Up Gmail"
                  onSuccess={successGoogle}
                  onFailure={failGoogle}
                  cookiePolicy={'single_host_origin'}
                  className={classes.socialGmail}
                />
              </Grid>

              <Grid item xs={6} lg={6} md={6}>
                <LinkedIn
                  clientId="867vhof1bgd0vm"
                  onFailure={responseGoogle}
                  onSuccess={successLinkedIn}
                  redirectUri={`${new URL('/linkedin', window.location.href)}`}
                  className={classes.socialLinkedIn}
                  scope="r_liteprofile r_emailaddress"
                >
                  <Typography
                    className={classes.linkedInText}
                    component="h1"
                    variant="h5"
                  >
                    in
                  </Typography>
                  Sign Up LinkedIn
                </LinkedIn>
              </Grid>
            </Grid>

            <Grid container justify="center">
              <Grid item>
                <Link component={RouterLink} variant="body2" to="/
                ">
                  {'Already have an account? Sign In'}
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.passwordValid} item xs={3}>
            <Typography variant="h6" gutterBottom>
              Password must contain
            </Typography>
            <FormControlLabel
              disabled
              control={
                <Checkbox
                  icon={<CircleUnchecked />}
                  checkedIcon={
                    <CircleCheckedFilled className={classes.greenCheck} />
                  }
                  checked={state.hasUpperCase}
                  value={state.hasUpperCase}
                />
              }
              label="At least 1 uppercase letter"
            />
            <FormControlLabel
              disabled
              control={
                <Checkbox
                  icon={<CircleUnchecked />}
                  checkedIcon={
                    <CircleCheckedFilled className={classes.greenCheck} />
                  }
                  checked={state.hasSpecialChar}
                  value={state.hasSpecialChar}
                />
              }
              label="At least 1 special character"
            />
            <FormControlLabel
              disabled
              control={
                <Checkbox
                  icon={<CircleUnchecked />}
                  checkedIcon={
                    <CircleCheckedFilled className={classes.greenCheck} />
                  }
                  checked={state.hasEightChar}
                  value={state.hasEightChar}
                />
              }
              label="More than 8 total characters"
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default withRouter(SignUpPage)