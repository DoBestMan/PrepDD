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

import {useGlobalState} from '../../../../../../store';
import StyledItem from './StyledItem';
import DefaultUserImage from '../../../../../common/DefaultUserImage';

import {
  SearchCompanyUsers_searchCompanyUsers,
  SearchCompanyUsers_searchCompanyUsers_users,
  SearchCompanyUsers_searchCompanyUsers_teams,
} from './__generated__/SearchCompanyUsers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      display: 'flex',
      alignItems: 'center',
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
      top: '35px',
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
  })
);

const SEARCH_COMPANY_USERS = gql`
  query SearchCompanyUsers($text: String!, $companyId: ID!) {
    searchCompanyUsers(text: $text, companyId: $companyId) {
      users {
        id
        email
        fullName
        profileUrl
      }
      teams {
        id
        name
      }
    }
  }
`;

interface OwnerFormProps {
  owners: (
    | SearchCompanyUsers_searchCompanyUsers_users
    | SearchCompanyUsers_searchCompanyUsers_teams)[];
  setOwners: React.Dispatch<
    React.SetStateAction<
      (
        | SearchCompanyUsers_searchCompanyUsers_users
        | SearchCompanyUsers_searchCompanyUsers_teams)[]
    >
  >;
}

interface InviteOwnerType {
  name: string;
  email: string;
}

export default function OwnerForm(props: OwnerFormProps) {
  const {owners, setOwners} = props;
  const classes = useStyles();
  const [openAddPanel, setOpenAddPanel] = useState<boolean>(false);
  const [openInvitePanel, setOpenInvitePanel] = useState<boolean>(false);
  const [searchUsername, setSearchUsername] = useState<string>('');
  const [searchResult, setSearchResult] = useState<
    SearchCompanyUsers_searchCompanyUsers
  >({
    __typename: 'SearchCompanyUsers',
    users: null,
    teams: null,
  });
  const [inviteOwner, setInviteOwner] = useState<InviteOwnerType>({
    name: '',
    email: '',
  });

  const {state} = useGlobalState();
  const [searchCompanyUsers, {loading, data, error}] = useLazyQuery(
    SEARCH_COMPANY_USERS
  );

  useEffect(() => {
    let result = idx(data, data => data.searchCompanyUsers);

    if (loading || !result) return;
    result.teams = result.teams.filter(
      (team: SearchCompanyUsers_searchCompanyUsers_teams) => {
        const bFound = owners.find(
          (
            owner:
              | SearchCompanyUsers_searchCompanyUsers_users
              | SearchCompanyUsers_searchCompanyUsers_teams
          ) => {
            if (owner.__typename === 'Team' && owner.id === team.id)
              return true;
            return false;
          }
        );
        return bFound ? false : true;
      }
    );
    result.users = result.users.filter(
      (user: SearchCompanyUsers_searchCompanyUsers_users) => {
        const bFound = owners.find(
          (
            owner:
              | SearchCompanyUsers_searchCompanyUsers_users
              | SearchCompanyUsers_searchCompanyUsers_teams
          ) => {
            if (owner.__typename === 'User' && owner.email === user.email)
              return true;
            return false;
          }
        );
        return bFound ? false : true;
      }
    );
    setSearchResult(result);
  }, [loading, idx(data, data => data.searchCompanyUsers)]);

  const handleCloseAll = () => {
    setOpenAddPanel(false);
    setOpenInvitePanel(false);
    setSearchResult({
      __typename: 'SearchCompanyUsers',
      users: null,
      teams: null,
    });
    setSearchUsername('');
  };

  const handleChangeSearchUsername = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {value} = event.target;
    setSearchUsername(value);
    searchCompanyUsers({
      variables: {text: value, companyId: state.selectedCompany},
    });
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      searchCompanyUsers({
        variables: {text: searchUsername, companyId: state.selectedCompany},
      });
    }
  };

  const handleClickUser = (event: React.MouseEvent<unknown>, index: number) => {
    if (searchResult.users && searchResult.users[index]) {
      setSearchResult({
        ...searchResult,
        users: [
          ...searchResult.users.slice(0, index),
          ...searchResult.users.slice(index + 1),
        ],
      });
      setOwners([...owners, searchResult.users[index]]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setInviteOwner({
      ...inviteOwner,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newOwner = {
      __typename: 'User',
      id: '',
      email: inviteOwner.email,
      fullName: inviteOwner.name,
      profileUrl: '',
    } as SearchCompanyUsers_searchCompanyUsers_users;

    setOwners([...owners, newOwner]);
    setInviteOwner({
      name: '',
      email: '',      
    });
  };

  const handleClickTeam = (event: React.MouseEvent<unknown>, index: number) => {
    if (searchResult.teams && searchResult.teams[index]) {
      setSearchResult({
        ...searchResult,
        teams: [
          ...searchResult.teams.slice(0, index),
          ...searchResult.teams.slice(index + 1),
        ],
      });
      setOwners([...owners, searchResult.teams[index]]);
    }
  };

  return (
    <div>
      <Typography variant="h6" className={classes.secondary}>
        List owner(s)
      </Typography>
      <div className={classes.flex}>
        {owners &&
          owners.map(
            (
              owner:
                | SearchCompanyUsers_searchCompanyUsers_users
                | SearchCompanyUsers_searchCompanyUsers_teams,
              index: number
            ) => {
              return owner.__typename === 'User' ? (
                <StyledItem
                  key={index}
                  type="user"
                  label={owner.fullName}
                  logo={owner.profileUrl as string}
                />
              ) : (
                <StyledItem
                  key={index}
                  type="user"
                  label={owner.name}
                  logo=""
                />
              );
            }
          )}
        <div
          style={{position: 'relative'}}
          onMouseOver={() => setOpenAddPanel(true)}
          onMouseLeave={handleCloseAll}
        >
          <Button className={classes.addButton}>+</Button>
          {openAddPanel ? (
            <ClickAwayListener onClickAway={() => setOpenAddPanel(false)}>
              <Paper
                className={classes.addPanel}
                elevation={0}
                onMouseOver={() => setOpenAddPanel(true)}
                onMouseLeave={handleCloseAll}
              >
                <TextField
                  className={classes.input}
                  placeholder="Search by name or email"
                  value={searchUsername}
                  onChange={handleChangeSearchUsername}
                  onKeyUp={handleKeyUp}
                />
                <List component="div" aria-labelledby="Invite Owner Panel">
                  {searchResult &&
                    searchResult.users &&
                    searchResult.users.map(
                      (
                        user: SearchCompanyUsers_searchCompanyUsers_users,
                        index: number
                      ) => {
                        return (
                          <ListItem
                            key={user.id}
                            onClick={(event: React.MouseEvent<unknown>) =>
                              handleClickUser(event, index)
                            }
                            disableGutters
                          >
                            <DefaultUserImage userName={user.fullName} />
                            <ListItemText
                              primary={user.fullName}
                              style={{marginLeft: '12px'}}
                            />
                          </ListItem>
                        );
                      }
                    )}
                  {searchResult &&
                    searchResult.teams &&
                    searchResult.teams.map(
                      (
                        team: SearchCompanyUsers_searchCompanyUsers_teams,
                        index: number
                      ) => {
                        return (
                          <ListItem
                            key={team.id}
                            onClick={(event: React.MouseEvent<unknown>) =>
                              handleClickTeam(event, index)
                            }
                            disableGutters
                          >
                            <DefaultUserImage userName={team.name} />
                            <ListItemText
                              primary={team.name}
                              style={{marginLeft: '12px'}}
                            />
                          </ListItem>
                        );
                      }
                    )}
                </List>
                {searchResult &&
                  searchResult.users &&
                  !searchResult.users.length &&
                  searchResult.teams &&
                  !searchResult.teams.length && (
                    <Typography variant="h4">No match result</Typography>
                  )}
                {openInvitePanel ? (
                  <form onSubmit={handleSubmit}>
                    <Typography variant="h6" style={{marginTop: '24px'}}>
                      New owner
                    </Typography>
                    <TextField
                      label="Name"
                      name="name"
                      value={inviteOwner.name}
                      className={classes.input}
                      onChange={handleChange}
                    />
                    <TextField
                      type="email"
                      label="Email"
                      name="email"
                      value={inviteOwner.email}
                      className={classes.input}
                      onChange={handleChange}
                      required
                    />
                    <Button type="submit" className={classes.addLink}>
                      Invite new member
                    </Button>
                  </form>
                ) : (
                  <Button
                    className={classes.addLink}
                    onClick={() => setOpenInvitePanel(true)}
                  >
                    + Add Member
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
