import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import idx from 'idx';
import {useLazyQuery} from '@apollo/react-hooks';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper, 
  TextField, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Button, 
  ClickAwayListener, 
} from '@material-ui/core';

import * as cs from '../../../../../../constants/theme';
import NameLabel from '../../../../../common/NameLabel';
import DefaultUserImage from '../../../../../common/DefaultUserImage';

import {useGlobalState} from '../../../../../../store';
import {SEARCH_COMPANY_USERS} from '../../../../../../helpers/queries';
import {
  SearchCompanyUsers_searchCompanyUsers,
  SearchCompanyUsers_searchCompanyUsers_users, 
  SearchCompanyUsers_searchCompanyUsers_teams  
} from '../../../../../../helpers/__generated__/SearchCompanyUsers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '24px', 
    },
    invisible: {
      display: 'none',
    },
    listArea: {
      display: 'flex', 
      alignItems: 'center', 
      borderBottom: '1px solid #D8D8D8',
    },
    mt12: {
      marginTop: '12px', 
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
    userImage: {
      width: '36px',
      height: '36px',
      backgroundColor: '#2792A2',
      fontSize: '12px',
      marginRight: '6px',
    },
    teamImage: {
      width: '36px',
      height: '36px',
      backgroundColor: '#FFFFFF', 
      border: '1px solid #2792A2',
      fontSize: '12px',
      marginRight: '6px',
      '& p': {
        color: '#2792A2', 
      }
    },
    addLink: {
      marginTop: '6px',
      paddingLeft: '0px',
      paddingRight: '0px',
    },
    relative: {
      position: 'relative',
    },
    morePaper: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '200px',
      position: 'absolute',
      top: '26px',
      right: '5px',
      padding: '9px',
      boxSizing: 'border-box',
      backgroundColor: '#FFFFFF',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
      zIndex: 2, 
    },
  })
);

interface NotificationPaneProps {
  value?: number;
  index?: number;
}

interface InviteMemberType {
  name: string;
  email: string;
}

export default function NotificationPane(props: NotificationPaneProps) {
  const {value, index} = props;
  const classes = useStyles();
  const {state} = useGlobalState();

  const [openInvitePanel, setOpenInvitePanel] = useState<boolean>(false);
  const [moreHover, setMoreHover] = useState<boolean>(false);
  const [reviewers, setReviewers] = useState<(SearchCompanyUsers_searchCompanyUsers_users | SearchCompanyUsers_searchCompanyUsers_teams)[]>([]);
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

  const [searchCompanyUsers, {loading, data, error}] = useLazyQuery(SEARCH_COMPANY_USERS);

  useEffect(() => {
    let result = idx(data, data => data.searchCompanyUsers);

    if (loading || !result) return;
    result.teams = result.teams.filter(
      (team: SearchCompanyUsers_searchCompanyUsers_teams) => {
        const bFound = reviewers.find(
          (
            reviewer:
              | SearchCompanyUsers_searchCompanyUsers_users
              | SearchCompanyUsers_searchCompanyUsers_teams
          ) => {
            if (reviewer.__typename === 'Team' && reviewer.id === team.id)
              return true;
            return false;
          }
        );
        return bFound ? false : true;
      }
    );
    result.users = result.users.filter(
      (user: SearchCompanyUsers_searchCompanyUsers_users) => {
        const bFound = reviewers.find(
          (
            reviewer:
              | SearchCompanyUsers_searchCompanyUsers_users
              | SearchCompanyUsers_searchCompanyUsers_teams
          ) => {
            if (reviewer.__typename === 'User' && reviewer.email === user.email)
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
      setReviewers([...reviewers, searchResult.users[index]]);
    }
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
      setReviewers([...reviewers, searchResult.teams[index]]);
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

    setReviewers([...reviewers, newOwner]);
    setInviteMember({
      name: '',
      email: '',
    });
  };

  return (
    <ClickAwayListener onClickAway={handleCloseAll}>
      <Paper
        className={clsx(classes.root, value !== index && classes.invisible)}
        aria-labelledby="Reviewer Pane"
        elevation={0}
      >
        <div className={classes.listArea}>
          {reviewers &&
            reviewers
              .slice(0, 2)
              .map(
              (
                reviewer:
                  | SearchCompanyUsers_searchCompanyUsers_users
                  | SearchCompanyUsers_searchCompanyUsers_teams,
                index: number
              ) => {
                return reviewer.__typename === 'User' ? (
                  <NameLabel
                    key={index}
                    type="user"
                    label={reviewer.fullName}
                    logo={reviewer.profileUrl as string}
                  />
                ) : (
                  <NameLabel
                    key={index}
                    type="team"
                    label={reviewer.name}
                  />
                );
              }
            )}
            {reviewers && reviewers.length > 2 && (
              <div
                className={classes.relative}
                onMouseOver={() => setMoreHover(true)}
                onMouseLeave={() => setMoreHover(false)}
              >
                <NameLabel label={`+${reviewers.length - 2}`} />
                {moreHover && (
                  <Paper
                    className={classes.morePaper}
                    elevation={0}
                    onMouseOver={() => setMoreHover(true)}
                    onMouseLeave={() => setMoreHover(false)}
                  >
                    {reviewers && reviewers.slice(2).map(      
                      (
                        reviewer:
                          | SearchCompanyUsers_searchCompanyUsers_users
                          | SearchCompanyUsers_searchCompanyUsers_teams,
                        index: number
                      ) => {
                        return reviewer.__typename === 'User' ? (
                          <NameLabel
                            key={index}
                            type="user"
                            label={reviewer.fullName}
                            logo={reviewer.profileUrl as string}
                          />
                        ) : (
                          <NameLabel
                            key={index}
                            type="team"
                            label={reviewer.name}
                          />
                        );
                      }
                    )}
                  </Paper>
                )}
              </div>
            )}
        </div>

        <div className={classes.mt12}>
          <TextField
            className={classes.input}
            placeholder="Search by name or email"
            value={searchUsername}
            onChange={handleChangeSearchUsername}
            onKeyUp={handleKeyUp}
          />
          <List component="div" aria-labelledby="Invite Reviewer Panel">
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
                      <DefaultUserImage userName={user.fullName} className={classes.userImage} />
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
                      <DefaultUserImage userName={team.name} className={classes.teamImage} />
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
              <Typography variant="h6" style={{marginTop: '12px'}}>
                New reviewer
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
        </div>
      </Paper>
    </ClickAwayListener>
  );
}
