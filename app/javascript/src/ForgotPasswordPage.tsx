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

const SEND_RESET_PASSWORD_INSTRUCTIONS = gql`
  mutation ForgotPasswordPage_SendResetPasswordInstructions($email: String!) {
    sendResetPasswordInstructions(email: $email) {
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
}));

function SuccessMessage() {
  const classes = useStyles({});

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset password
        </Typography>
        <div className={classes.form}>
          <FlashMessage
            className={classes.flash}
            variant="success"
            message="Email sent"
          />
          <Typography variant="body1">
            Please check your email for a instructions on resetting your
            password.
          </Typography>
        </div>
      </div>
    </Container>
  );
}

export default function ForgotPasswordPage(props: {path?: string}) {
  const classes = useStyles({});

  const [state, setState] = useState<{
    email: string;
  }>({
    email: '',
  });

  const [sendResetPasswordInstructions, {loading, data}] = useMutation(
    SEND_RESET_PASSWORD_INSTRUCTIONS,
    {
      variables: {
        email: state.email,
      },
    }
  );

  function errorFor(path: string) {
    const errors = idx(data, x => x.sendResetPasswordInstructions.errors);
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
      sendResetPasswordInstructions();
    },
    [sendResetPasswordInstructions]
  );

  const onChangeInput = useCallback(
    e => {
      const {name, value} = e.target;
      setState(state => ({...state, [name]: value}));
    },
    [setState]
  );

  console.log(
    'success',
    idx(data, data => data.sendResetPasswordInstructions.success)
  );

  if (idx(data, data => data.sendResetPasswordInstructions.success)) {
    return <SuccessMessage />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset password
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
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
            error={!!errorFor('email')}
            helperText={errorFor('email')}
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
