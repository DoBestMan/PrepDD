import React, {useState, useEffect} from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {gql} from 'apollo-boost';
import {useLazyQuery} from '@apollo/react-hooks';
import {
  ClickAwayListener,
  Button,
  TextField,
  Typography,
  Paper,
  List,
} from '@material-ui/core';

import StyledItem from './StyledItem';
import NestedList from './NestedList';
import {
  CompanySettings_company_parents,
  CompanySettings_company_brokers,
} from '../../../../../graphql/queries/__generated__/CompanySettings';
import {
  SearchCompanies_searchCompanies_users,
  SearchCompanies_searchCompanies_companies,
} from '../../../../../graphql/queries/__generated__/SearchCompanies';

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
      zIndex: 1, 
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
    morePaper: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '250px',
      position: 'absolute',
      top: '28px',
      right: '6px',
      padding: '9px',
      boxSizing: 'border-box',
      border: '2px solid #D8D8D8',
      borderRadius: '3px',
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
    companyItem: {
      display: 'flex',
      width: '100%',
      padding: '12px',
      alignItems: 'center',
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontSize: '15px',
      fontWeight: 'bold',
      '&:hover': {
        cursor: 'pointer',
        background: '#EBF2FF',
      },
    },
    companyLogo: {
      width: '24px',
      minWidth: '24px', 
      height: '24px',
      marginRight: '12px',
    },
    nestedList: {
      width: '100%', 
      background: '#FFFFFF', 
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

const SEARCH_COMPANIES = gql`
  query SearchCompanies($text: String!) {
    searchCompanies(text: $text) {
      users {
        id
        fullName
        profileUrl
        companies {
          id
          name
          logoUrl
        }
      }
      companies {
        id
        name
        logoUrl
      }
    }
  }
`;

export default function CompanyForm(props: CompanyFormProps) {
  const {label, placeholder, companies, onUpdate, onDelete} = props;
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [moreHover, setMoreHover] = useState<boolean>(false);
  const [state, setState] = useState<{
    companyName: string;
    userEmail: string;
    newCompany: string;
  }>({
    companyName: '',
    userEmail: '',
    newCompany: '',
  });

  const [searchCompanies, {loading, data, error}] = useLazyQuery(SEARCH_COMPANIES)

  useEffect(() => {
    if (loading) return;
    console.log("Fetching data", data);
  }, [loading, data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState(state => ({...state, [name]: value}));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      // Search companies...
      searchCompanies({ variables: {text: state.companyName} });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Pressed Submit');
    setOpen(false);
  };

  const renderUserList = () => {
    return (
      <List
        component="div"
        aria-labelledby="nested-list"
        className={classes.nestedList}
      >
        {data && data.searchCompanies && data.searchCompanies.users &&
          data.searchCompanies.users.map((user: SearchCompanies_searchCompanies_users) => {
            return (
              <NestedList data={user} key={user.id} />
            )
          })
        }
      </List>
    )
  }

  return (
    <div className={classes.root}>
      <p>{label}</p>
      <div className={classes.companyList}>
        {companies &&
          companies
            .slice(0, 2)
            .map(company => (
              <StyledItem
                key={company.id}
                logo={company.logoUrl}
                label={company.name}
                onClose={() => onDelete(company.id)}
              />
            ))}
        {companies && companies.length > 2 && (
          <div
            onMouseOver={() => setMoreHover(true)}
            onMouseLeave={() => setMoreHover(false)}
            style={{position: 'relative'}}
          >
            <StyledItem label={`+${companies.length - 2}`} />
            {moreHover && (
              <Paper
                className={classes.morePaper}
                elevation={0}
                onMouseOver={() => setMoreHover(true)}
                onMouseLeave={() => setMoreHover(false)}
              >
                {companies.slice(2).map(company => (
                  <StyledItem
                    key={company.id}
                    logo={company.logoUrl}
                    label={company.name}
                    onClose={() => onDelete(company.id)}
                  />
                ))}
              </Paper>
            )}
          </div>
        )}
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
            {(data && data.searchCompanies && data.searchCompanies.companies) &&
              data.searchCompanies.companies.slice(0, 5).map((company: SearchCompanies_searchCompanies_companies) => {
                  return (
                    <Typography
                      key={company.id}
                      className={classes.companyItem}
                      variant="inherit"
                    >
                      {company.logoUrl && (
                        <img
                          src={company.logoUrl}
                          className={classes.companyLogo}
                          alt={company.name}
                        />
                      )}
                      <span>{company.name} </span>                    
                    </Typography>
                  )
                })
            }
            {(data && data.searchCompanies && data.searchCompanies.companies && !data.searchCompanies.companies.length && 
              data.searchCompanies.users) &&
              renderUserList()
            }
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
                Invite new company
              </Button>
            </form>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
