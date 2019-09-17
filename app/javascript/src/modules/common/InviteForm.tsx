import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import idx from 'idx';
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

import * as cs from '../../constants/theme';
import {useGlobalState} from '../../store';
import DefaultUserImage from './DefaultUserImage';
import NameLabel from './NameLabel';

import {SEARCH_COMPANY_USERS} from '../../helpers/queries';
import {
  SearchCompanyUsers_searchCompanyUsers,
  SearchCompanyUsers_searchCompanyUsers_users,
  SearchCompanyUsers_searchCompanyUsers_teams,
} from '../../helpers/__generated__/SearchCompanyUsers';

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
      color: cs.COLORS.primary,
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
      fontSize: '15px',
      marginBottom: '12px',
    },
    addPanel: {
      position: 'absolute',
      width: '280px',
      top: '35px',
      left: '0px',
      padding: '12px 24px 18px',
      backgroundColor: '#FFFFFF',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
      zIndex: 1,
    },
    smallPanelPos: {
      top: '24px',
    },
    input: {
      display: 'block',
      width: '100%',
      marginTop: '6px',
      color: '#606060',
      fontFamily: cs.FONT.family,
      fontWeight: cs.FONT.weight.regular,
      fontSize: cs.FONT.size.xs,
      textTransform: 'none',
      '& label': {
        color: '#606060',
        fontFamily: cs.FONT.family,
        fontWeight: cs.FONT.weight.regular,
        fontSize: cs.FONT.size.xs,
      },
      '&:selected': {
        color: '#3A84FF',
      },
      '& input::placeholder': {
        fontSize: cs.FONT.size.xs,
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
  size?: 'small';
}

interface InviteMemberType {
  name: string;
  email: string;
}

export default function OwnerForm(props: OwnerFormProps) {
  const {owners, setOwners, size} = props;
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
  const [inviteMember, setInviteMember] = useState<InviteMemberType>({
    name: '',
    email: '',
  });

  const {state} = useGlobalState();
  const [searchCompanyUsers, {loading, data, error}] = useLazyQuery(SEARCH_COMPANY_USERS);

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

    setInviteMember({
      ...inviteMember,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newOwner = {
      __typename: 'User',
      id: '',
      email: inviteMember.email,
      fullName: inviteMember.name,
      profileUrl: '',
    } as SearchCompanyUsers_searchCompanyUsers_users;

    setOwners([...owners, newOwner]);
    setInviteMember({
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
    <div
      style={{position: 'relative'}}
      onMouseOver={() => setOpenAddPanel(true)}
      onMouseLeave={handleCloseAll}
    >
      {size && size === 'small' ? (
        <NameLabel label="+" className={classes.addButton} />
      ) : (
        <Button className={classes.addButton}>+</Button>
      )}

      {openAddPanel ? (
        <ClickAwayListener onClickAway={() => setOpenAddPanel(false)}>
          <Paper
            className={clsx(
              classes.addPanel,
              size === 'small' && classes.smallPanelPos
            )}
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
                <Typography variant="h3">No match result</Typography>
              )}
            {openInvitePanel ? (
              <form onSubmit={handleSubmit}>
                <Typography variant="h6" style={{marginTop: '24px'}}>
                  New owner
                </Typography>
                <TextField
                  label="Name"
                  name="name"
                  value={inviteMember.name}
                  className={classes.input}
                  onChange={handleChange}
                />
                <TextField
                  type="email"
                  label="Email"
                  name="email"
                  value={inviteMember.email}
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
  );
}
