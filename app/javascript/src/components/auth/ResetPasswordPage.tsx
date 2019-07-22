import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import React from 'react';
import idx from 'idx';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useUserForPasswordReset} from '../../graphql/queries/UserForPasswordReset';

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

export default function ResetPasswordPage({
  token = '',
}: {
  path?: string;
  token?: string;
}) {
  const classes = useStyles({});
  const {_loading, data} = useUserForPasswordReset({token});
  const email = idx(data, data => data.userForPasswordReset.email);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset password {token}
        </Typography>
        <form className={classes.form} noValidate onSubmit={() => {}}>
          <TextField
            autoComplete="email"
            disabled
            fullWidth
            label="Email Address"
            margin="normal"
            name="email"
            value={email || ''}
            variant="outlined"
          />
          <TextField
            autoFocus
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            required
            type="password"
            value=""
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            margin="normal"
            name="passwordConfirmation"
            required
            type="password"
            value=""
            variant="outlined"
          />
          <Button
            className={classes.submit}
            color="primary"
            fullWidth
            type="submit"
            variant="contained"
          >
            Update password
          </Button>
        </form>
      </div>
    </Container>
  );
}
