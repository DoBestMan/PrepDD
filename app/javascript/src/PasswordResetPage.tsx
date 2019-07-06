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
}));

export default function PasswordReset(props: {path?: string}) {
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

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset password
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          {errors &&
            errors.map((error, index) => (
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send reset email
          </Button>
        </form>
      </div>
    </Container>
  );
}
