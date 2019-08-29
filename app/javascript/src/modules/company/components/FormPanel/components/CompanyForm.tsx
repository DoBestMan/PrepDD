import React, {useState} from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  ClickAwayListener,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';

import {
  CompanySettings_company_parents,
  CompanySettings_company_brokers,
} from '../../../../../graphql/queries/__generated__/CompanySettings';
import StyledItem from './StyledItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      marginTop: '24px',
      color: '#606060',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      textTransform: 'capitalize',
    },
    companyList: {
      display: 'flex',
      height: '36px',
      alignItems: 'center',
      borderBottom: '1px solid #D8D8D8',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '15px',
      textTransform: 'capitalize',
    },
    clickableArea: {
      flexGrow: 1,
      height: '25px',
    },
    addPaper: {
      width: '100%',
      background: '#FFFFFF',
      position: 'absolute',
      top: '30px',
      right: '0px',
      padding: '12px',
      boxSizing: 'border-box',
      border: '2px solid #D8D8D8',
      borderRadius: '3px',
    },
    input: {
      display: 'block',
      width: '100%',
      marginTop: '6px',
      color: '#606060',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      '& label': {
        color: '#606060',
        fontFamily: 'Montserrat',
        fontWeight: 600,
        fontSize: '12px',
      },
      '&:selected': {
        color: '#3A84FF',
      },
      '& input::placeholder': {
        fontSize: '12px',
      },
      '& div': {
        width: '100%',
      },
    },
    formTitle: {
      color: 'black',
      marginTop: '24px',
    },
    addLink: {
      marginTop: '24px',
      padding: '0px',
      color: '#3A84FF',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      textTransform: 'capitalize',
      '&:hover, &:focus': {
        background: 'none',
      },
    },
  })
);

interface CompanyFormProps {
  label: string;
  placeholder: string;
  companies:
    | CompanySettings_company_parents[]
    | CompanySettings_company_brokers[]
    | null;
  onUpdate: (newValue: string) => void;
  onDelete: (newValue: string) => void;
}

export default function CompanyForm(props: CompanyFormProps) {
  const {label, placeholder, companies, onUpdate, onDelete} = props;
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<{
    companyName: string;
    userEmail: string;
    newCompany: string;
  }>({
    companyName: '',
    userEmail: '',
    newCompany: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState(state => ({...state, [name]: value}));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      // Search companies...
      alert('Pressed Enter');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Pressed Submit');
    // onUpdate(parent);
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <p>{label}</p>
      <div className={classes.companyList}>
        {companies &&
          companies.map(company => (
            <StyledItem
              key={company.id}
              logo={company.logoUrl}
              label={company.name}
              onClose={() => onDelete(company.id)}
            />
          ))}
        <div
          className={classes.clickableArea}
          onClick={() => setOpen(true)}
          style={{position: 'relative'}}
        >
          {!companies || !companies.length ? placeholder : null}
        </div>
      </div>

      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <div className={classes.addPaper}>
            <TextField
              id="company"
              name="companyName"
              placeholder={placeholder}
              className={classes.input}
              value={state.companyName}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
            />
            <form onSubmit={handleSubmit}>
              <Typography className={classes.formTitle} variant="h6">
                New user and company
              </Typography>
              <TextField
                id="userEmail"
                name="userEmail"
                type="email"
                label="Email"
                className={classes.input}
                value={state.userEmail}
                onChange={handleChange}
                required
              />
              <TextField
                id="newCompany"
                name="newCompany"
                label="Company"
                className={classes.input}
                onChange={handleChange}
                value={state.newCompany}
                required
              />
              <Button type="submit" className={classes.addLink}>
                Invite new user and company
              </Button>
            </form>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
