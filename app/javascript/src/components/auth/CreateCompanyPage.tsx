import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FlashMessage from '../common/FlashMessage';
import Grid from '@material-ui/core/Grid';
import idx from 'idx';
import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useRequireGuest} from '../../hooks/auth';
import {Link as RouterLink, navigate} from '@reach/router';

import {useCompanyCreate} from "../../graphql/mutations/CreateCompany";

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
    width: '86%',
    marginLeft: '7%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  companyTitle: {
    textAlign: 'center',
  }
}));

export default function CreateCompanyPage(_props: {path?: string}) {

  const classes = useStyles({});

  const [state, setState] = useState<{
    name: string
  }>({
    name: ''
  });


  const [createCompany, {data}] = useCompanyCreate({
    name: state.name,
  });

  useEffect(() => {
    if (idx(data, data => data.createCompany.success)) {
      navigate('/signup?companyName='+ state.name);
    }
  }, [data]);

  function errorFor(path: string) {
    const errors = idx(data, x => x.createCompany.errors);
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
      createCompany();
    },
    [createCompany]
  );

  const onChangeInput = useCallback(
    e => {
      const {name, value} = e.target;
      setState(state => ({...state, [name]: value}));
    },
    [setState]
  );

  return (
    <Container component="main" maxWidth="xl">
      <div className={classes.paper}>
        <Grid container spacing={5}>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.companyTitle}>
              <Typography component="h1" variant="h5">
                Create New Company
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
                label="Company Name"
                name="name"
                autoFocus
                value={state.name}
                error={!!errorFor('name')}
                helperText={errorFor('name')}
                onChange={onChangeInput}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Continue
              </Button>
            </form>


          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
