import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import idx from 'idx';
import {gql} from 'apollo-boost';
import {useLazyQuery} from '@apollo/react-hooks';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  ClickAwayListener,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@material-ui/core';

import StyledItem from './StyledItem';
import NestedList from './NestedList';

import {useGlobalState} from '../../../../../../store';
import {ListType} from '../../../../../../constants/types';
import {
  SearchCompanies_searchCompanies,
  SearchCompanies_searchCompanies_users,
  SearchCompanies_searchCompanies_companies,
} from './__generated__/SearchCompanies';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
    },
    clickalbleArea: {
      height: '36px',
      flexGrow: 1,
    },
    secondary: {
      color: '#606060',
      marginTop: '24px',
      marginBottom: '12px',
    },
    addButton: {
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
      fontSize: '15px',
    },
    addPanel: {
      position: 'absolute',
      width: '280px',
      top: '33px',
      left: '0px',
      padding: '12px 24px 18px',
      backgroundColor: '#FFFFFF',
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
    addLink: {
      marginTop: '6px',
      paddingLeft: '0px',
      paddingRight: '0px',
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

interface NewCompanyType {
  newCompanyName: string;
  ownerEmail: string;
}

interface CompanyFormProps {
  sharing: string;
  newTemplate: ListType;
  setNewTemplate: React.Dispatch<React.SetStateAction<ListType>>;
  inviteCompany: NewCompanyType;
  setInviteCompany: React.Dispatch<React.SetStateAction<NewCompanyType>>;
}

export default function CompanyForm(props: CompanyFormProps) {
  const {
    sharing,
    newTemplate,
    setNewTemplate,
    inviteCompany,
    setInviteCompany,
  } = props;
  const classes = useStyles();
  const [searchString, setSearchString] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [openInvitePanel, setOpenInvitePanel] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<
    SearchCompanies_searchCompanies
  >({
    __typename: 'SearchCompanies',
    users: null,
    companies: null,
  });
  const [
    issueCompany,
    setIssueCompany,
  ] = useState<SearchCompanies_searchCompanies_companies | null>(null);
  const {state} = useGlobalState();

  const [searchCompanies, {loading, data, error}] = useLazyQuery(
    SEARCH_COMPANIES
  );

  useEffect(() => {
    let result = idx(data, data => data.searchCompanies);

    if (loading || !result) return;
    result.companies = result.companies.filter(
      (company: SearchCompanies_searchCompanies_companies) =>
        company.id !== state.selectedCompany
    );
    setSearchResult(result);
  }, [loading, idx(data, data => data.searchCompanies)]);

  const handleCloseAll = () => {
    setOpen(false);
    setOpenInvitePanel(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      // Search companies...
      searchCompanies({
        variables: {text: searchString},
      });
    }
  };

  const handleClickIssueTo = (
    company: SearchCompanies_searchCompanies_companies
  ) => {
    if (sharing === 'share') {
      setNewTemplate({
        ...newTemplate,
        requesterId: company.id,
      });
    } else if (sharing === 'issue') {
      setNewTemplate({
        ...newTemplate,
        responderId: company.id,
      });
    }
    setIssueCompany(company);
    setOpen(false);
  };

  const handleChangeInviteInfo = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {name, value} = event.target;

    setInviteCompany({
      ...inviteCompany,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIssueCompany({
      __typename: 'Company',
      id: '',
      name: inviteCompany.newCompanyName,
      logoUrl: '',
    });
  };

  const renderUserList = () => {
    if (searchResult && searchResult.users && searchResult.users.length) {
      return (
        <List
          component="div"
          aria-labelledby="nested-list"
          className={classes.nestedList}
        >
          {data &&
            searchResult &&
            searchResult.users &&
            searchResult.users.map(
              (user: SearchCompanies_searchCompanies_users) => {
                return (
                  <NestedList
                    key={user.id}
                    data={user}
                    onClick={handleClickIssueTo}
                  />
                );
              }
            )}
        </List>
      );
    } else if (
      searchResult &&
      searchResult.companies &&
      !searchResult.companies.length
    ) {
      return <Typography variant="h4">No match result</Typography>;
    } else {
      return null;
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.secondary}>
        Issue to
      </Typography>
      <div className={classes.flex}>
        {issueCompany && (
          <StyledItem
            label={issueCompany.name as string}
            logo={issueCompany.logoUrl as string}
          />
        )}
        <div
          style={{position: 'relative'}}
          onMouseOver={() => setOpen(true)}
          onMouseLeave={handleCloseAll}
        >
          <Button className={classes.addButton}>+</Button>
          {open ? (
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <Paper
                className={classes.addPanel}
                elevation={0}
                onMouseOver={() => setOpen(true)}
                onMouseLeave={handleCloseAll}
              >
                <TextField
                  className={classes.input}
                  placeholder="Search company..."
                  value={searchString}
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                />
                <List component="div" aria-labelledby="Invite new">
                  {searchResult &&
                    searchResult.companies &&
                    searchResult.companies.slice(0, 5).map(company => {
                      return (
                        <ListItem
                          key={company.id}
                          onClick={() => handleClickIssueTo(company)}
                          disableGutters
                        >
                          {company.logoUrl && (
                            <img
                              src={company.logoUrl}
                              className={classes.companyLogo}
                              alt={company.name}
                            />
                          )}
                          <ListItemText primary={company.name as string} />
                        </ListItem>
                      );
                    })}
                </List>
                {renderUserList()}
                {openInvitePanel ? (
                  <form onSubmit={handleSubmit}>
                    <Typography variant="h6" style={{marginTop: '24px'}}>
                      New user and company
                    </Typography>
                    <TextField
                      type="email"
                      label="Email"
                      name="ownerEmail"
                      value={inviteCompany.ownerEmail}
                      className={classes.input}
                      onChange={handleChangeInviteInfo}
                      required
                    />
                    <TextField
                      label="Company"
                      name="newCompanyName"
                      value={inviteCompany.newCompanyName}
                      className={classes.input}
                      onChange={handleChangeInviteInfo}
                      required
                    />
                    <Button type="submit" className={classes.addLink}>
                      Invite new user and company
                    </Button>
                  </form>
                ) : (
                  <Button
                    className={classes.addLink}
                    onClick={() => setOpenInvitePanel(true)}
                  >
                    + Add owner
                  </Button>
                )}
              </Paper>
            </ClickAwayListener>
          ) : null}
        </div>
      </div>
    </div>
  );
}
