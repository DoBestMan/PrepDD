import React, {useState, useEffect} from 'react';
import {gql} from 'apollo-boost';
import {useLazyQuery} from '@apollo/react-hooks';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
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
import {useCreateAssociatedCompany} from '../../../../../graphql/mutations/CreateAssociatedCompany';
import {
  CompanySettings_company_parents,
  CompanySettings_company_brokers,
} from '../../../../../graphql/queries/__generated__/CompanySettings';
import {CompanySettings_company} from '../../../../../graphql/queries/__generated__/CompanySettings';
import {
  SearchCompanies_searchCompanies,
  SearchCompanies_searchCompanies_users,
  SearchCompanies_searchCompanies_companies,
} from '../../../../list/CreateListPage/components/CreateListStep/components/__generated__/SearchCompanies';

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
      textTransform: 'none',
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
      marginTop: '12px',
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
  companyData: CompanySettings_company;
  companies:
    | CompanySettings_company_parents[]
    | CompanySettings_company_brokers[]
    | null;
  currentCompanyId: string;
  parent?: boolean;
  setCompany: (value: React.SetStateAction<CompanySettings_company>) => void;
  onUpdate: (newValue: string) => void;
  onDelete: (newValue: string) => void;
}

const SEARCH_COMPANIES = gql`
  query SearchCompanies($text: String!, $companyId: ID) {
    searchCompanies(text: $text, companyId: $companyId) {
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
  const {
    label,
    placeholder,
    companyData,
    companies,
    currentCompanyId,
    parent,
    setCompany,
    onUpdate,
    onDelete,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
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
  const [result, setResult] = useState<SearchCompanies_searchCompanies>({
    __typename: 'SearchCompanies',
    users: null,
    companies: null,
  });

  const [searchCompanies, {loading, data, error}] = useLazyQuery(
    SEARCH_COMPANIES
  );
  const [
    createAssociatedCompany,
    {
      loading: createCompanyLoading,
      data: createCompanyRes,
      error: createCompanyError,
    },
  ] = useCreateAssociatedCompany({
    companyId: currentCompanyId,
    ownerEmail: state.userEmail,
    newCompanyName: state.newCompany,
    isParent: parent,
    isBroker: !parent,
  });

  useEffect(() => {
    const searchResult = idx(data, data => data.searchCompanies);

    if (loading || !searchResult) return;
    setResult(searchResult);
  }, [loading, idx(data, data => data.searchCompanies)]);

  useEffect(() => {
    const createdCompany = idx(
      createCompanyRes,
      createCompanyRes => createCompanyRes.createAssociatedCompany.company
    );

    if (createCompanyLoading || !createdCompany) return;

    if (parent) {
      setCompany({
        ...companyData,
        parents: [...companyData.parents, createdCompany],
      });
    } else {
      setCompany({
        ...companyData,
        brokers: [...companyData.brokers, createdCompany],
      });
    }

    setState({
      companyName: '',
      userEmail: '',
      newCompany: '',
    });

    handleClose();
  }, [
    createCompanyLoading,
    idx(
      createCompanyRes,
      createCompanyRes => createCompanyRes.createAssociatedCompany.company
    ),
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState(state => ({...state, [name]: value}));
    if (name === 'companyName') {
      searchCompanies({
        variables: {text: value, companyId: currentCompanyId},
      });
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      // Search companies...
      searchCompanies({
        variables: {text: state.companyName, companyId: currentCompanyId},
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createAssociatedCompany();
  };

  const handleClickCompany = (companyId: string, index: number) => {
    if (result.companies) {
      const newCompanies = result.companies
        .slice(0, index)
        .concat(result.companies.slice(index + 1));
      setResult({
        ...result,
        companies: newCompanies,
      });
    }
    onUpdate(companyId);
  };

  const handleClickAssignedCompany = (userId: string, companyId: string) => {
    if (result.users) {
      const userIndex = result.users.findIndex(user => user.id === userId);
      if (userIndex < 0) return;

      const selectedCompanies = idx(
        result,
        result => result.users[userIndex].companies
      );
      if (!selectedCompanies) return;
      const companyIndex = selectedCompanies.findIndex(
        company => company.id === companyId
      );
      if (companyIndex < 0) return;

      let newUsers: SearchCompanies_searchCompanies_users[] = result.users;
      const newCompanies = selectedCompanies
        .slice(0, companyIndex)
        .concat(selectedCompanies.slice(companyIndex + 1));
      newUsers[userIndex].companies = newCompanies;
      setResult({
        ...result,
        users: newUsers,
      });
    }
    onUpdate(companyId);
  };

  const handleClose = () => {
    setOpen(false);
    setResult({
      __typename: 'SearchCompanies',
      users: null,
      companies: null,
    });
    setState({
      companyName: '',
      userEmail: '',
      newCompany: '',
    });
    setOpenForm(false);
  };

  const renderUserList = () => {
    if (result && result.users && result.users.length) {
      return (
        <List
          component="div"
          aria-labelledby="nested-list"
          className={classes.nestedList}
        >
          {data &&
            result &&
            result.users &&
            result.users.map((user: SearchCompanies_searchCompanies_users) => {
              return (
                <NestedList
                  key={user.id}
                  data={user}
                  handleClick={handleClickAssignedCompany}
                />
              );
            })}
        </List>
      );
    } else if (
      result.companies &&
      !result.companies.length &&
      result.users &&
      !result.users.length
    ) {
      return (
        <Typography variant="h4" style={{marginTop: '12px'}}>
          No match result
        </Typography>
      );
    } else {
      return null;
    }
  };

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
        <ClickAwayListener onClickAway={handleClose}>
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
            {result &&
              result.companies &&
              result.companies
                .slice(0, 5)
                .map(
                  (
                    company: SearchCompanies_searchCompanies_companies,
                    index: number
                  ) => {
                    return (
                      <Typography
                        key={company.id}
                        className={classes.companyItem}
                        variant="inherit"
                        onClick={() => handleClickCompany(company.id, index)}
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
                    );
                  }
                )}
            {renderUserList()}

            {openForm ? (
              <form onSubmit={handleSubmit}>
                <Typography className={classes.formTitle} variant="h6">
                  New company
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
            ) : (
              <Button
                className={classes.addLink}
                onClick={() => setOpenForm(true)}
              >
                Invite new company
              </Button>
            )}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
