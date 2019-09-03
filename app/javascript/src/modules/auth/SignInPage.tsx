import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FlashMessage from '../common/FlashMessage';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import idx from 'idx';
import Link from '@material-ui/core/Link';
import React, {useCallback, useState, useEffect} from 'react';
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
import {useSignInUser} from '../../graphql/mutations/SignInUser';

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
    linkedInText: {
      marginRight: 10,
      display: 'inline',
      fontWeight: 'bold',
    },
    prepLink: {
      textDecoration: 'none',
      color: '#3f51b5',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    signInTitle: {
      textAlign: 'center',
    },
    socialButtons: {
      width: '86%',
      marginLeft: '7%',
    },
  })
);

const SignInPage = (props: any) => {
  const {history} = props;

  const classes = useStyles({});

  const [state, setState] = useState<{
    email: string;
    password: string;
    remember: boolean;
    socialLogin: boolean;
    tokenID: string;
    provider: string;
    uuID: string;
  }>({
    email: '',
    password: '',
    remember: false,
    socialLogin: false,
    tokenID: '',
    provider: '',
    uuID: '',
  });

  const [signInUser, {loading, data, error}] = useSignInUser({
    email: state.email,
    password: state.password,
    socialLogin: state.socialLogin,
    tokenID: state.tokenID,
    provider: state.provider,
    uuID: state.uuID,
  });

  interface linkedInResponse {
    code: string;
  }

  useEffect(() => {
    const signInUser = idx(data, data => data.signInUser);
    if (loading || !signInUser) return;
    window.location.href = "/app"
  }, [loading, idx(data, data => data.signInUser)]);

  const errors = idx(data, x => x.signInUser.errors);

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
      signInUser();
    }
  };

  const successLinkedIn = (response: linkedInResponse) => {
    setState(state => ({
      ...state,
      socialLogin: true,
      provider: 'linkedIn',
      tokenID: response.code,
    }));
    signInUser();
  };

  return (
    <Container component="main" maxWidth="xl">
      <div className={classes.paper}>
        <Grid container spacing={5}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <div className={classes.signInTitle}>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </div>
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

            <Grid className={classes.socialButtons} container>
              <Grid item xs={6} lg={6} md={6}>
                <GoogleLogin
                  clientId="1090849701177-kq5gufe0g2vssa71lu9jkg1tid11k6ib.apps.googleusercontent.com"
                  buttonText="Sign In Gmail"
                  onSuccess={successGoogle}
                  onFailure={responseGoogle}
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
                  scope="r_liteprofile r_emailaddress"
                  className={classes.socialLinkedIn}
                >
                  <Typography
                    className={classes.linkedInText}
                    component="h1"
                    variant="h5"
                  >
                    in
                  </Typography>
                  Sign In LinkedIn
                </LinkedIn>
              </Grid>
              <Grid container>
                <Grid item xs>
                  <Link component={RouterLink} variant="body2" to="/forgot">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <a
                    className={classes.prepLink}
                    href={'https://www.prepdd.com/pricing'}
                  >
                    {"Don't have an account? Sign Up"}
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default withRouter(SignInPage);