import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FlashMessage from '../common/FlashMessage';
import Grid from '@material-ui/core/Grid';
import idx from 'idx';
import Link from '@material-ui/core/Link';
import React, {useCallback, useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {GoogleLogin} from 'react-google-login';
import {Link as RouterLink, navigate} from '@reach/router';
import {LinkedIn} from 'react-linkedin-login-oauth2';
import {makeStyles} from '@material-ui/core/styles';
import {useRequireGuest} from '../../hooks/auth';
import {useSignUpUser} from '../../graphql/mutations/SignUpUser';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';

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
    fontSize: 15,
    width: '90%',
    textAlign: 'center',
    marginBottom: 10,
    height: 43,
    borderRadius: 5,
  },
  socialLinkedIn: {
    fontSize: 15,
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
    marginLeft: 50,
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
    width: '100%'
  },
  signUpTitle: {
    textAlign: 'center',
  }
}));

export default function SignUpPage(_props: {path?: string}) {
  useRequireGuest();

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
    hasEightChar: boolean
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


  const [signUpUser, {data}] = useSignUpUser({
    fullName: state.fullName,
    email: state.email,
    password: state.password,
    companyName: state.companyName,
    socialLogin: state.socialLogin,
    tokenID: state.tokenID,
    provider: state.provider,
    uuID: state.uuID,
  });

  useEffect(() => {
    if (idx(data, data => data.signUpUser.success)) {
      localStorage.removeItem('CompanyName');
      navigate('/dashboard');
    }
  }, [data]);

  useEffect(() => {
    const company = localStorage.hasOwnProperty('CompanyName')? localStorage.getItem('CompanyName') : '';
    if(company !== null){
      setState(state => ({...state, companyName: company}));
    }
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
      if (name == 'password'){
        if(value.match(/[A-Z]/)){
          setState(state => ({...state, hasUpperCase: true}));
        } else {
          setState(state => ({...state, hasUpperCase: false}));
        }

        if(value.length >= 8){
          setState(state => ({...state, hasEightChar: true}));
        } else {
          setState(state => ({...state, hasEightChar: false}));
        }

        if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)){
          setState(state => ({...state, hasSpecialChar: true}));
        } else {
          setState(state => ({...state, hasSpecialChar: false}));
        }
      }
    },
    [setState]
  );

  const responseGoogle = (response: any) => {
    console.log(response);
  };

  const successGoogle = (response: any) => {
    if (response.profileObj) {
      setState(state => ({...state,
        email: response.profileObj.email,
        fullName: response.profileObj.name,
        socialLogin: true,
        provider: 'gmail',
        tokenID: response.tokenId,
        uuID: response.googleId
      }));
      signUpUser();
    }
  };

  const failGoogle = (response: any) => {
    console.log(response);
  };

  const successLinkedIn = (data: any) => {
    setState(state => ({...state,
      socialLogin: true,
      provider: 'linkedIn',
      tokenID:  data.code,
    }));
    signUpUser();
  }

  return (
    <Container component="main" maxWidth="lg">
      <div className={classes.paper}>
        <Grid container spacing={5}>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={5}>
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

            <Grid className={classes.socialButtons}  container>
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
                  clientId="81lx5we2omq9xh"
                  onFailure={responseGoogle}
                  onSuccess={successLinkedIn}
                  redirectUri={ new URL('/linkedin', window.location.href) }
                  className={classes.socialLinkedIn}
                >
                  <Typography className={classes.linkedInText} component="h1" variant="h5">
                    in
                  </Typography>
                  Sign Up LinkedIn
                </LinkedIn>
              </Grid>
            </Grid>

            <Grid container justify="center">
              <Grid item>
                <Link component={RouterLink} variant="body2" to="/signin">
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
              control={<Checkbox
                icon={<CircleUnchecked />}
                checkedIcon={<CircleCheckedFilled className={classes.greenCheck}/>}
                checked={state.hasUpperCase}
                value={state.hasUpperCase} />}
              label="At least 1 uppercase letter"
            />
            <FormControlLabel
              disabled
              control={<Checkbox
                icon={<CircleUnchecked />}
                checkedIcon={<CircleCheckedFilled className={classes.greenCheck}/>}
                checked={state.hasSpecialChar}
                value={state.hasSpecialChar} />}
              label="At least 1 special character"
            />
            <FormControlLabel
              disabled
              control={<Checkbox
                icon={<CircleUnchecked />}
                checkedIcon={<CircleCheckedFilled className={classes.greenCheck}/>}
                checked={state.hasEightChar}
                value={state.hasEightChar} />}
              label="More than 8 total characters"
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
