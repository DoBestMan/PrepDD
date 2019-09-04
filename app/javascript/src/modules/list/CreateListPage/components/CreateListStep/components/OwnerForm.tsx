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

import {SearchCompanyUsers_searchCompanyUsers_users} from './__generated__/SearchCompanyUsers';

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
    }
  })
);

const SEARCH_COMPANY_USERS = gql`
  query SearchCompanyUsers($text: String!, $companyId: ID!) {
    searchCompanyUsers(text: $text, companyId: $companyId) {
      users {
        id
        fullName
        profileUrl
      }
    }
  }
`;

interface OwnerFormProps {
  owners: SearchCompanyUsers_searchCompanyUsers_users[];
  setOwners: React.Dispatch<React.SetStateAction<SearchCompanyUsers_searchCompanyUsers_users[]>>;
}

export default function OwnerForm(props: OwnerFormProps) {
  const {owners, setOwners} = props;
  const classes = useStyles();
  const [openAddPanel, setOpenAddPanel] = useState<boolean>(false);
  const [openInvitePanel, setOpenInvitePanel] = useState<boolean>(false);
  const [searchUsername, setSearchUsername] = useState<string>("");
  const [searchedUsers, setSearchedUsers] = useState<SearchCompanyUsers_searchCompanyUsers_users[]>([]);
  
  const {state} = useGlobalState();
  const [searchCompanyUsers, {loading, data, error}] = useLazyQuery(SEARCH_COMPANY_USERS);

  useEffect(() => {
    const users = idx(data, data => data.searchCompanyUsers.users);

    if (loading || !users) return;
    setSearchedUsers(users);
  }, [loading, idx(data, data => data.searchCompanyUsers.users)])

  const handleCloseAll = () => {
    setOpenAddPanel(false);
    setOpenInvitePanel(false);
  }

  const handleChangeSearchUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUsername(event.target.value);
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      searchCompanyUsers({
        variables: {text: searchUsername, companyId: state.selectedCompany},
      });
    }
  }

  const handleClick = (event: React.MouseEvent<unknown>, index: number) => {
    setOwners([
      ...owners, 
      searchedUsers[index]
    ])
  }
  
  return (
    <div>
      <Typography variant="h6" className={classes.secondary}>List owner(s)</Typography>
      <div className={classes.flex}>
        {owners && owners.map(owner => {
          return (
            <StyledItem 
              key={owner.id}
              type="user"
              label={owner.fullName} 
              logo={owner.profileUrl as string}
            />
          )
        })}
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
                  {searchedUsers && searchedUsers.map((user: SearchCompanyUsers_searchCompanyUsers_users, index: number) => {
                    return (
                      <ListItem 
                        key={user.id} 
                        onClick={(event: React.MouseEvent<unknown>) => handleClick(event, index)}
                        disableGutters
                      >
                        <DefaultUserImage userName={user.fullName} />
                        <ListItemText primary={user.fullName} style={{marginLeft: '12px'}} />
                      </ListItem>
                    )
                  })}
                </List>
                {openInvitePanel ? (
                  <form>
                    <Typography variant="h6" style={{marginTop: '24px'}}>New owner</Typography>
                    <TextField 
                      className={classes.input}
                      label="Name"
                    />
                    <TextField 
                      className={classes.input}
                      label="Email"
                      required
                    />
                    <Button type="submit" className={classes.addLink}>
                      Invite new owner
                    </Button>
                  </form>
                ): (
                  <Button 
                    className={classes.addLink}
                    onClick={() => setOpenInvitePanel(true)}
                  >+ Add owner</Button>
                )}
              </Paper>
            </ClickAwayListener>
          ) : null}
        </div>
      </div>
    </div>
  )
}